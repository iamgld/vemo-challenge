// Angular Imports
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '@environment'
// Shared Imports
import { Country, CountryLanguage } from '@shared/models'
// Store Imports
import { Store } from '@ngrx/store'
import { INITIALIZE_COUNTRIES } from '@store/actions'
// Thirdparty Imports
import { map, tap } from 'rxjs'
import { NbGlobalLogicalPosition, NbToastrService } from '@nebular/theme'

@Injectable()
export class CountriesService {
	constructor(private _http: HttpClient, private _store: Store, private _toastr: NbToastrService) {}

	getAllCountries() {
		const headers = new HttpHeaders({})

		return this._http.get(`${environment.countries.apiUrl}/all`, { headers }).pipe(
			map((response: any) => {
				// console.log('response', response)

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

						const countryLanguages: CountryLanguage[] = []
						const buildCountryLanguages = (): void => {
							let countryLanguage: CountryLanguage = {
								code: '-',
								name: 'unknown language',
							}
							if (item.languages) {
								Object.entries(item.languages).map(([key, value]: [string, any]) => {
									countryLanguage.code = key.toUpperCase()
									countryLanguage.name = value
								})
							}
							countryLanguages.push(countryLanguage)
						}
						buildCountryLanguages()

						const country: Country = {
							name: item.name.common || '-',
							capitals: item.capital || ['-'],
							currencies: formatCurrencies() || ['-'],
							continents: item.continents || ['-'],
							languages: countryLanguages,
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
				this._toastr.success(
					'Countries was updated successfully',
					`${countries.length} countries`,
					{
						duration: 3000,
						destroyByClick: true,
						preventDuplicates: true,
						position: NbGlobalLogicalPosition.BOTTOM_END,
						icon: 'globe-2-outline',
					}
				)
			})
		)
	}
}
