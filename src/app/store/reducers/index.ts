// Store Imports
import { ActionReducerMap } from '@ngrx/store'
import { GlobalState } from '@store/models'
// Reducer Imports
import { countriesReducer, initialCountriesState } from './countries/countries.reducer'

export const globalState: GlobalState = {
	countries: initialCountriesState,
}

export const reducers: ActionReducerMap<GlobalState> = {
	countries: countriesReducer,
}
