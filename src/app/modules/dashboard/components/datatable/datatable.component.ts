// Angular Imports
import { Component, OnInit, OnDestroy } from '@angular/core'
// This Module Imports
import { DialogCountryComponent } from '@dashboard/components'
import { CountriesService } from '@dashboard/services'
// Shared Imports
import { Country } from '@shared/models'
// Nebular Imports
import {
	NbDialogService,
	NbSortDirection,
	NbSortRequest,
	NbTreeGridDataSource,
	NbTreeGridDataSourceBuilder,
} from '@nebular/theme'
// Store Imports
import { Store } from '@ngrx/store'
import { getFilteredCountries } from '@store/selectors'
// Thirdparty Imports
import { Subject, takeUntil } from 'rxjs'

interface TreeNode<T> {
	data: T
	children?: TreeNode<T>[]
	expanded?: boolean
}

@Component({
	selector: 'app-datatable',
	templateUrl: './datatable.component.html',
	styleUrls: ['./datatable.component.scss'],
})
export class DatatableComponent implements OnInit, OnDestroy {
	isLoading = true
	allColumns: string[] = [
		'name',
		'capitals',
		'currencies',
		'continents',
		'languages',
		'population',
		'flag',
	]
	dataSource!: NbTreeGridDataSource<Country>
	sortColumn: string = ''
	sortDirection: NbSortDirection = NbSortDirection.NONE

	private _destroy$ = new Subject<void>()

	constructor(
		private _dialog: NbDialogService,
		private _dataSourceBuilder: NbTreeGridDataSourceBuilder<Country>,
		private _countries: CountriesService,
		private _store: Store
	) {}

	ngOnInit(): void {
		this._store
			.select(getFilteredCountries)
			.pipe(takeUntil(this._destroy$))
			.subscribe({
				next: (countriesFiltered: Country[]) => {
					if (countriesFiltered.length) {
						this._updateDataSource(countriesFiltered)
					}
				},
			})

		this._countries.getAllCountries().subscribe({
			next: (countries: Country[]) => {
				// console.log('countries', countries)
				this.isLoading = false
			},
			error: (error) => {
				console.error(error)
			},
			complete: () => {
				this.isLoading = false
			},
		})
	}

	ngOnDestroy(): void {
		this._destroy$.complete()
	}

	changeSort(sortRequest: NbSortRequest): void {
		this.dataSource.sort(sortRequest)
		this.sortColumn = sortRequest.column
		this.sortDirection = sortRequest.direction
	}

	getDirection(column: string): NbSortDirection {
		if (column === this.sortColumn) {
			return this.sortDirection
		}
		return NbSortDirection.NONE
	}

	openDialog(country: Country) {
		this._dialog.open(DialogCountryComponent, {})
	}

	private _updateDataSource(countries: Country[]) {
		const dataSource: TreeNode<Country>[] = []
		countries.map((country: Country) => {
			const data: TreeNode<Country> = {
				data: country,
				children: [],
				expanded: false,
			}
			dataSource.push(data)
		})
		this.dataSource = this._dataSourceBuilder.create(dataSource)
		this.isLoading = false
	}
}
