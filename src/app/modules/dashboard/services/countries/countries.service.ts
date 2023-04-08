// Angular Imports
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '@environment'
// Shared Imports
import { Country } from '@shared/models'
// Store Imports
import { Store } from '@ngrx/store'
import { INITIALIZE_COUNTRIES } from '@store/actions'
// Thirdparty Imports
import { map, tap } from 'rxjs'

@Injectable()
export class CountriesService {
	constructor(private _http: HttpClient, private _store: Store) {}

	getAllCountries() {
		const headers = new HttpHeaders({})

		return this._http.get(`${environment.countries.apiUrl}/all`, { headers }).pipe(
			map((response: any) => {
				console.log('response', response)

				const countries: Country[] = []

				// Type each country data
				if (response && response.length) {
					response.map((item: any) => {
						const formatCurrencies = () => {
							if (item.currencies) {
								return Object.entries(item.currencies).map(
									([key, value]: [string, any]) => `${key.toUpperCase()} - ${value.name} `
								)
							} else {
								return false
							}
						}

						const formatLanguages = () => {
							if (item.currencies) {
								return Object.entries(item.languages).map(
									([key, value]: [string, any]) => `${key.toUpperCase()} - ${value} `
								)
							} else {
								return false
							}
						}

						const country: Country = {
							name: item.name.common || '-',
							capitals: item.capital || ['-'],
							currencies: formatCurrencies() || ['-'],
							continents: item.continents || ['-'],
							languages: formatLanguages() || ['-'],
							population: item.population || 0,
							flag: {
								imageUrl: item.flags.svg || '-',
								imageAlt: item.flags.alt || 'Not image description available',
							},
						}
						countries.push(country)
					})
				}

				return countries
			}),
			tap((countries: Country[]) => {
				this._store.dispatch(INITIALIZE_COUNTRIES({ countries }))
			})
		)
	}
}
