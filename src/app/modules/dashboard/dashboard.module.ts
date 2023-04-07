// Angular Imports
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
// This Module Imports
import { DashboardRoutingModule } from './dashboard-routing.module'
import { HomeComponent } from '@dashboard/views'
// Shared Imports
import { MaterialModule } from '@shared/modules'

const views = [HomeComponent]

@NgModule({
	declarations: [...views],
	imports: [CommonModule, DashboardRoutingModule, MaterialModule],
})
export class DashboardModule {}
