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
				const thisContinentExist = countriesPerContinent.find(
					(countryPerContinent: CountriesPerContinent) =>
						countryPerContinent.continent === continent
				)

				if (thisContinentExist) {
					const findCurrentContinent = countriesPerContinent.find(
						(countriesPerContinent: CountriesPerContinent) =>
							countriesPerContinent.continent === continent
					)

					if (findCurrentContinent) {
						const countryPerContinent: CountriesPerContinent = {
							continent,
							countries: [...findCurrentContinent.countries, country],
						}
						const index: number = countriesPerContinent.indexOf(findCurrentContinent)
						countriesPerContinent[index] = countryPerContinent
					} else {
						console.error(`Something went wrong, this continent doesn't exists`)
					}
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
				const thisLanguageExist = countriesPerLanguage.find(
					(countryPerLanguage: CountriesPerLanguage) =>
						countryPerLanguage.language.code === language.code
				)

				if (thisLanguageExist) {
					const findCurrentLanguage = countriesPerLanguage.find(
						(countryPerLanguage: CountriesPerLanguage) =>
							countryPerLanguage.language.code === language.code
					)
					if (findCurrentLanguage) {
						const countryPerLanguage: CountriesPerLanguage = {
							language,
							countries: [...findCurrentLanguage.countries, country],
						}
						const index: number = countriesPerLanguage.indexOf(countryPerLanguage)
						countriesPerLanguage[index] = countryPerLanguage
					} else {
						console.error(`Something went wrong, this language doesn't exists`)
					}
				} else {
					const countryPerLanguage: CountriesPerLanguage = {
						language,
						countries: [country],
					}
					countriesPerLanguage.push(countryPerLanguage)
				}
			})
		})

		// let countCountries = 0
		// countriesPerLanguage.map((item: any) => {
		// 	console.log('language', item.language, item.countries.length)
		// 	item.countries.map((country: any) => {
		// 		countCountries = countCountries + 1
		// 	})
		// })

		// console.log('countCountries', countCountries)

		return countriesPerLanguage
	}
}
