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
	fiveMostPopulatedCountries: Country[] = []

	private _destroy$ = new Subject()
	constructor(private _store: Store) {}

	ngOnInit(): void {
		this._store
			.select(getFilteredCountries)
			.pipe(takeUntil(this._destroy$))
			.subscribe({
				next: (countriesFiltered: Country[]) => {
					if (countriesFiltered.length) {
						this.countries = countriesFiltered
						this.fiveMostPopulatedCountries = this._findFiveMostPopulateCountries(countriesFiltered)
					}
				},
			})
	}

	ngOnDestroy(): void {
		this._destroy$.complete()
	}

	private _findFiveMostPopulateCountries(countries: Country[]): Country[] {
		const sortedByMosPopulatedCountries = countries.sort(
			(a: Country, b: Country) => b.population - a.population
		)
		const fiveMostPopulatedCountries = sortedByMosPopulatedCountries.slice(0, 5)

		return fiveMostPopulatedCountries
	}
}
