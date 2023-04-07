// Angular Imports
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
// This Module Imports
import { HomeComponent } from '@dashboard/views'

const routes: Routes = [
	{
		path: '',
		title: 'VEMO - Home',
		component: HomeComponent,
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardRoutingModule {}
