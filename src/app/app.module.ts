// Angular Imports
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { environment } from '@environment'
// This Module Imports
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
// Store Imports
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { reducers } from '@store/reducers'
import { effects } from '@store/effects'
// Nebular Imports
import { NbThemeModule, NbDialogModule, NbToastrModule } from '@nebular/theme'
import { NbEvaIconsModule } from '@nebular/eva-icons'

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		// Nebular Theme
		NbThemeModule.forRoot({ name: 'cosmic' }),
		NbDialogModule.forRoot({}),
		NbToastrModule.forRoot({}),
		// Store (NGRX)
		StoreModule.forRoot(reducers),
		EffectsModule.forRoot(effects),
		StoreDevtoolsModule.instrument({
			name: 'Angular Template Store',
			maxAge: 25,
			logOnly: environment.production,
			autoPause: true,
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
