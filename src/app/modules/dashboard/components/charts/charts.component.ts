// Angular Imports
import { Component, OnInit, OnDestroy } from '@angular/core'
// Shared Imports
import { Country } from '@shared/models'
// Store Imports
import { Store } from '@ngrx/store'
import { getFilteredCountries } from '@store/selectors'
// Thirdparty Imports
import { Subject, takeUntil } from 'rxjs'

@Component({
	selector: 'app-charts',
	templateUrl: './charts.component.html',
	styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit, OnDestroy {
	countries: Country[] = []

	private _destroy$ = new Subject()
	constructor(private _store: Store) {}

	ngOnInit(): void {
		this._store
			.select(getFilteredCountries)
			.pipe(takeUntil(this._destroy$))
			.subscribe({
				next: (countriesFiltered: Country[]) => {
					this.countries = countriesFiltered
				},
			})
	}

	ngOnDestroy(): void {
		this._destroy$.complete()
	}
}
