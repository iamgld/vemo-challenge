// Store Imports
import { createAction, props } from '@ngrx/store'
// Shared Imports
import { Country } from '@shared/models'

export const INITIALIZE_COUNTRIES = createAction(
	'[Countries] Initialize Countries',
	props<{ countries: Country[] }>()
)

export const FILTER_COUNTRIES = createAction(
	'[Countries] Filter Countries',
	props<{ countriesFiltered: Country[] }>()
)

export const CLEAR_FILTER_COUNTRIES = createAction('[Countries] Clear Filter Countries')
