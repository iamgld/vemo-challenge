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
	NbGlobalLogicalPosition,
	NbSortDirection,
	NbSortRequest,
	NbToastrService,
	NbTreeGridDataSource,
	NbTreeGridDataSourceBuilder,
} from '@nebular/theme'
// Store Imports
import { Store } from '@ngrx/store'
import { getFilteredCountries } from '@store/selectors'
// Thirdparty Imports
import { Subject } from 'rxjs'

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

	private _destroy$ = new Subject()

	constructor(
		private _dialog: NbDialogService,
		private _dataSourceBuilder: NbTreeGridDataSourceBuilder<Country>,
		private _countries: CountriesService,
		private _store: Store,
		private _toastr: NbToastrService
	) {}

	ngOnInit(): void {
		this._store.select(getFilteredCountries).subscribe({
			next: (countriesFiltered: Country[]) => {
				if (countriesFiltered.length) {
					this._updateDataSource(countriesFiltered)
				}
			},
		})

		this._countries.getAllCountries().subscribe({
			next: (countries: Country[]) => {
				// console.log('countries', countries)
			},
			error: (error) => {
				this.isLoading = false
				// throw new Error(error)
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
		console.log('click', country)
		const dialogRef = this._dialog.open(DialogCountryComponent, {})
		dialogRef.onClose.subscribe({
			next: () => {
				console.log('closed')
			},
		})
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
		this._toastr.success('Countries was updated successfully', `${dataSource.length} countries`, {
			duration: 5000,
			destroyByClick: true,
			preventDuplicates: true,
			position: NbGlobalLogicalPosition.BOTTOM_END,
			icon: 'globe-2-outline',
		})
	}
}
