// Angular Imports
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
// This Module Imports
import { DashboardRoutingModule } from './dashboard-routing.module'
import { HomeComponent } from '@dashboard/views'
import {
	DatatableComponent,
	DialogCountryComponent,
	AutocompleteComponent,
	ChartsComponent,
	ChartMostPopulatedCountriesComponent,
	ChartCountriesPerContinentComponent,
	ChartCountriesPerLanguageComponent,
} from '@dashboard/components'
import { CountriesService } from '@dashboard/services'
// Shared Imports
import { NebularModule } from '@shared/modules'
// Thirdparty Imports
import { NgChartsModule } from 'ng2-charts'

const views = [HomeComponent]

const components = [
	DatatableComponent,
	DialogCountryComponent,
	AutocompleteComponent,
	ChartsComponent,
	ChartMostPopulatedCountriesComponent,
	ChartCountriesPerContinentComponent,
	ChartCountriesPerLanguageComponent,
]

const services = [CountriesService]

@NgModule({
	declarations: [...views, ...components],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		NebularModule,
		// Ng2 Charts
		NgChartsModule,
	],
	providers: [...services],
})
export class DashboardModule {}
