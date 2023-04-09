// Angular Imports
import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormControl } from '@angular/forms'
// This Module Imports
import { CountriesService } from '@dashboard/services'
// Shared Imports
import { Country, CountryCurrency, CountryLanguage } from '@shared/models'
// Thirdparty Imports
import { map, debounceTime, distinctUntilChanged, Subject, tap, takeUntil, timer } from 'rxjs'
// Store Imports
import { Store } from '@ngrx/store'
import { getOriginalCountries } from '@store/selectors'
import { CLEAR_FILTER_COUNTRIES, FILTER_COUNTRIES } from '@store/actions'
// Nebular Imports
import { NbThemeService } from '@nebular/theme'

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
	countries: Country[] = []
	inputFormControl: FormControl = new FormControl('')
	toggleFormControl = new FormControl(false)

	private _destroy$ = new Subject<void>()
	private _countdown$ = timer(750)

	constructor(
		private _store: Store,
		private _countries: CountriesService,
		private _theme: NbThemeService
	) {}

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

		this.toggleFormControl.valueChanges
			.pipe(
				takeUntil(this._destroy$),
				map((value: boolean | null) => (value ? true : false)),
				tap((active: boolean) => {
					if (active) {
						this._theme.changeTheme('cosmic')
					} else {
						this._theme.changeTheme('default')
					}
				})
			)
			.subscribe()
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
