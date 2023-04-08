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
} from '@dashboard/components'
import { CountriesService } from '@dashboard/services'
// Shared Imports
import { NebularModule } from '@shared/modules'

const views = [HomeComponent]

const components = [DatatableComponent, DialogCountryComponent, AutocompleteComponent]

const services = [CountriesService]

@NgModule({
	declarations: [...views, ...components],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		NebularModule,
	],
	providers: [...services],
})
export class DashboardModule {}
