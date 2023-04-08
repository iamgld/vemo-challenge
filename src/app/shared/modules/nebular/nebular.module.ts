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
]

@NgModule({
	declarations: [],
	imports: [CommonModule],
	exports: [...exportModules],
})
export class NebularModule {}
