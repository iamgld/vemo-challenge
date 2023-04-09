// Store Imports
import { createReducer, on } from '@ngrx/store'
import { INITIALIZE_COUNTRIES, FILTER_COUNTRIES, CLEAR_FILTER_COUNTRIES } from '@store/actions'
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
	}),
	on(FILTER_COUNTRIES, (previousState: CountriesState, { countriesFiltered }) => {
		return {
			...previousState,
			filtered: countriesFiltered,
		}
	}),
	on(CLEAR_FILTER_COUNTRIES, (previousState: CountriesState) => {
		return {
			...previousState,
			filtered: previousState.original,
		}
	})
)
