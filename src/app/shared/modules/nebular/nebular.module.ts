// Angular Imports
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
// Nebular Imports
import {
	NbLayoutModule,
	NbTreeGridModule,
	NbCardModule,
	NbTooltipModule,
	NbSpinnerModule,
	NbAutocompleteModule,
	NbInputModule,
	NbButtonModule,
	NbIconModule,
	NbToggleModule,
} from '@nebular/theme'
import { NbEvaIconsModule } from '@nebular/eva-icons'

const exportModules = [
	NbEvaIconsModule,
	NbLayoutModule,
	NbTreeGridModule,
	NbCardModule,
	NbTooltipModule,
	NbSpinnerModule,
	NbAutocompleteModule,
	NbInputModule,
	NbButtonModule,
	NbIconModule,
	NbToggleModule,
]

@NgModule({
	declarations: [],
	imports: [CommonModule],
	exports: [...exportModules],
})
export class NebularModule {}
