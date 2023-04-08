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
	DialogChartsComponent,
	HeaderComponent,
	ChartsComponent,
	ChartMostPopulatedCountriesComponent,
	ChartCountriesPerContinentComponent,
	ChartCountriesPerLanguageComponent,
} from '@dashboard/components'
import { CountriesService } from '@dashboard/services'
// Shared Imports
import { NebularModule } from '@shared/modules'
// Thirdparty Imports
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts'

const views = [HomeComponent]

const components = [
	DatatableComponent,
	DialogCountryComponent,
	DialogChartsComponent,
	HeaderComponent,
	ChartsComponent,
	ChartMostPopulatedCountriesComponent,
	ChartCountriesPerContinentComponent,
	ChartCountriesPerLanguageComponent,
]

const services = [CountriesService]

const chartsConfig: NgChartsConfiguration = {
	generateColors: true,
	defaults: {
		font: { size: 11, family: "'Roboto', sans-serif" },
		color: '#fafafa',
		borderColor: '#1B1B39',
		responsive: true,
	},
}

@NgModule({
	declarations: [...views, ...components],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		NebularModule,
		// Ng2 Charts
		NgChartsModule.forRoot(chartsConfig),
	],
	providers: [...services],
})
export class DashboardModule {}
