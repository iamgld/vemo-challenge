// Store Imports
import { createSelector, createFeatureSelector } from '@ngrx/store'
// Shared Imports
import { CountriesState } from '@store/models'

const countriesFeature = createFeatureSelector<CountriesState>('countries')

export const getOriginalCountries = createSelector(
	countriesFeature,
	(countries: CountriesState) => countries.original
)

export const getFilteredCountries = createSelector(
	countriesFeature,
	(countries: CountriesState) => countries.filtered
)
