// Angular Imports
import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormControl } from '@angular/forms'
// Shared Imports
import { CountriesService } from '@dashboard/services'
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
} from 'rxjs'
// Store Imports
import { Store } from '@ngrx/store'
import { Country } from '@shared/models'

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
	groups: Group[] = []
	filteredGroups$!: Observable<Group[]>
	inputFormControl: FormControl = new FormControl('')

	private _destroy$ = new Subject<void>()

	constructor(private _store: Store, private _countries: CountriesService) {}

	ngOnInit() {
		this.groups = [
			{
				name: 'Group 1',
				children: ['Option 11', 'Option 12', 'Option 13'],
			},
			{
				name: 'Group 2',
				children: ['Option 21', 'Option 22', 'Option 23'],
			},
			{
				name: 'Group 3',
				children: ['Option 31', 'Option 32', 'Option 33'],
			},
		]

		this.filteredGroups$ = of(this.groups)
		this.inputFormControl = new FormControl()

		this.filteredGroups$ = this.inputFormControl.valueChanges.pipe(
			startWith(''),
			map((filterString) => this.filter(filterString))
		)
	}

	ngOnDestroy(): void {
		this._destroy$.complete()
	}

	private filterChildren(children: string[], filterValue: string) {
		return children.filter((optionValue) => optionValue.toLowerCase().includes(filterValue))
	}

	private filter(value: string): Group[] {
		const filterValue = value.toLowerCase()
		return this.groups
			.map((group) => {
				return {
					name: group.name,
					children: this.filterChildren(group.children, filterValue),
				}
			})
			.filter((group) => group.children.length)
	}

	trackByFn(index: number, item: any) {
		return item.name
	}

	onRefreshCountries() {
		this.isLoadingRefresh = true
		this._countries
			.getAllCountries()
			.pipe(takeUntil(this._destroy$), debounceTime(2000))
			.subscribe({
				next: (countries: Country[]) => {
					// console.log('countries', countries)
					this.isLoadingRefresh = false
				},
				error: (error) => {
					console.error(error)
				},
				complete: () => {
					this.isLoadingRefresh = false
				},
			})
	}

	onSearchCountries() {
		this.isLoadingSearch = true
		this.inputFormControl.valueChanges
			.pipe(
				takeUntil(this._destroy$)
				// map((value: string) => value?.toLowerCase().trim()),
				// debounceTime(500),
				// distinctUntilChanged(),
				// filter((value: string) => value !== '' && value?.length >= this.minLength),
				// tap((value: string) => this.onSearch(value)),
			)
			.subscribe()
	}
}
