// Angular Imports
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'

const components: any[] = []

@NgModule({
	declarations: [...components],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [...components],
})
export class ComponentsModule {}
