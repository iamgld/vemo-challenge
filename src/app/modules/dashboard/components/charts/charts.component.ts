// Angular Imports
import { Component, OnInit, OnDestroy } from '@angular/core'
// Shared Imports
import {
	CountriesPerContinent,
	Country,
	CountriesPerLanguage,
	CountryLanguage,
} from '@shared/models'
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
	countriesPerContinent: CountriesPerContinent[] = []
	countriesPerLanguage: CountriesPerLanguage[] = []

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
						this.countriesPerContinent = this._buildCountriesPerContinent(countriesFiltered)
						this.countriesPerLanguage = this._buildCountriesPerLanguage(countriesFiltered)
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

	private _buildCountriesPerContinent(countries: Country[]): CountriesPerContinent[] {
		const countriesPerContinent: CountriesPerContinent[] = []

		countries.map((country: Country) => {
			country.continents.map((continent: string) => {
				const findCurrentContinent = countriesPerContinent.find(
					(countriesPerContinent: CountriesPerContinent) =>
						countriesPerContinent.continent.trim() === continent.trim()
				)

				if (findCurrentContinent) {
					const countryPerContinent: CountriesPerContinent = {
						continent,
						countries: [...findCurrentContinent.countries, country],
					}
					const index: number = countriesPerContinent.indexOf(findCurrentContinent)
					countriesPerContinent[index] = countryPerContinent
				} else {
					const countryPerContinent: CountriesPerContinent = {
						continent,
						countries: [country],
					}
					countriesPerContinent.push(countryPerContinent)
				}
			})
		})

		return countriesPerContinent
	}

	private _buildCountriesPerLanguage(countries: Country[]): CountriesPerLanguage[] {
		const countriesPerLanguage: CountriesPerLanguage[] = []

		countries.map((country: Country) => {
			country.languages.map((language: CountryLanguage) => {
				const findCurrentLanguage = countriesPerLanguage.find(
					(countryPerLanguage: CountriesPerLanguage) =>
						countryPerLanguage.language.code.trim() === language.code.trim()
				)
				if (findCurrentLanguage) {
					const countryPerLanguage: CountriesPerLanguage = {
						language,
						countries: [...findCurrentLanguage.countries, country],
					}
					const index: number = countriesPerLanguage
						.map((countryPerLanguage: CountriesPerLanguage) => countryPerLanguage.language.code)
						.indexOf(countryPerLanguage.language.code)
					countriesPerLanguage[index] = countryPerLanguage
				} else {
					const countryPerLanguage: CountriesPerLanguage = {
						language,
						countries: [country],
					}
					countriesPerLanguage.push(countryPerLanguage)
				}
			})
		})

		return countriesPerLanguage
	}
}
