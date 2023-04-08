// Store Imports
import { createReducer, on } from '@ngrx/store'
import { INITIALIZE_COUNTRIES } from '@store/actions'
import { CountriesState } from '@store/models'

export const initialCountriesState: CountriesState = {
	original: [],
	filtered: [],
}

export const countriesReducer = createReducer(
	initialCountriesState,
	on(INITIALIZE_COUNTRIES, (previousState: CountriesState, { countries }) => {
		return {
			...previousState,
			original: countries,
			filtered: countries,
		}
	})
)
