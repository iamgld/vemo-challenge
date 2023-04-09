// Angular Imports
import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormControl } from '@angular/forms'
// This Module Imports
import { CountriesService } from '@dashboard/services'
// Shared Imports
import { Country, CountryCurrency, CountryLanguage } from '@shared/models'
// Thirdparty Imports
import {
	Observable,
	of,
	map,
	startWith,
	debounceTime,
	distinctUntilChanged,
	Subject,
	tap,
	switchMap,
	takeUntil,
	timer,
	filter,
} from 'rxjs'
// Store Imports
import { Store } from '@ngrx/store'
import { getOriginalCountries } from '@store/selectors'
import { CLEAR_FILTER_COUNTRIES, FILTER_COUNTRIES } from '@store/actions'

export interface Group {
	name: string
	children: string[]
}

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	isLoadingRefresh = false
	isLoadingSearch = false
	// groups: Group[] = []
	// filteredGroups$!: Observable<Group[]>
	countries: Country[] = []
	inputFormControl: FormControl = new FormControl('')

	private _destroy$ = new Subject<void>()
	private _countdown$ = timer(750)

	constructor(private _store: Store, private _countries: CountriesService) {}

	ngOnInit() {
		this._store
			.select(getOriginalCountries)
			.pipe(takeUntil(this._destroy$))
			.subscribe({
				next: (countriesOriginal: Country[]) => {
					if (countriesOriginal.length) {
						this.countries = countriesOriginal
					}
				},
			})

		this.inputFormControl.valueChanges
			.pipe(
				takeUntil(this._destroy$),
				map((value: string) => value.toLowerCase().trim()),
				debounceTime(250),
				distinctUntilChanged(),
				tap((value: string) => {
					this.isLoadingSearch = true
					if (value) {
						this._filterCountries(value)
					} else {
						this._clearFilter()
					}
				})
			)
			.subscribe({
				next: () => {
					// Automatically disbale loader
					this._countdown$.subscribe({ next: () => (this.isLoadingSearch = false) })
				},
			})
	}

	ngOnDestroy(): void {
		this._destroy$.complete()
	}

	onRefreshCountries() {
		this.isLoadingRefresh = true
		this._countries
			.getAllCountries()
			.pipe(takeUntil(this._destroy$))
			.subscribe({
				next: (countries: Country[]) => {
					// console.log('countries', countries)
					this.isLoadingRefresh = false
				},
				error: (error) => {
					console.error(error)
					this.isLoadingRefresh = false
				},
			})
	}

	onClearFilter() {
		this.isLoadingSearch = true
		this.inputFormControl.setValue('')
	}

	private _filterCountries(value: string) {
		const wanted = value.trim().toLowerCase()
		let countriesFiltered: Country[] = []

		countriesFiltered = this.countries.filter((country: Country) => {
			return (
				country.name.trim().toLowerCase().includes(wanted) ||
				country.capitals.some((capital: string) => capital.trim().toLowerCase().includes(wanted)) ||
				country.continents.some((continent: string) =>
					continent.trim().toLowerCase().includes(wanted)
				) ||
				country.currencies.some((currency: CountryCurrency) =>
					currency.name.trim().toLowerCase().includes(wanted)
				) ||
				country.languages.some((language: CountryLanguage) =>
					language.name.trim().toLowerCase().includes(wanted)
				)
			)
		})
		this._store.dispatch(FILTER_COUNTRIES({ countriesFiltered }))
	}

	private _clearFilter() {
		this._store.dispatch(CLEAR_FILTER_COUNTRIES())
	}
}
