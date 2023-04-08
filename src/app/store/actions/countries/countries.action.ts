// Store Imports
import { createAction, props } from '@ngrx/store'
// Shared Imports
import { Country } from '@shared/models'

export const INITIALIZE_COUNTRIES = createAction(
	'[Countries] Initialize Countries',
	props<{ countries: Country[] }>()
)
