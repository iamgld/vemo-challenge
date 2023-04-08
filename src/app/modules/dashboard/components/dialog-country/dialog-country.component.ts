// Angular Imports
import { Component } from '@angular/core'
// Shared Imports
import { Country } from '@shared/models'
// Nebular Imports
import { NbDialogRef } from '@nebular/theme'

@Component({
	selector: 'app-dialog-country',
	templateUrl: './dialog-country.component.html',
	styleUrls: ['./dialog-country.component.scss'],
})
export class DialogCountryComponent {
	constructor(protected dialogRef: NbDialogRef<Country>) {}

	close() {
		this.dialogRef.close()
	}
}
