// Angular Imports
import { Component } from '@angular/core'
// Shared Imports
import { Country } from '@shared/models'
// Nebular Imports
import { NbDialogRef } from '@nebular/theme'
// Thirdparty Imports
import { timer } from 'rxjs'

@Component({
	selector: 'app-dialog-country',
	templateUrl: './dialog-country.component.html',
	styleUrls: ['./dialog-country.component.scss'],
})
export class DialogCountryComponent {
	isLoading = true

	private _countdown$ = timer(1500)

	constructor(protected dialogRef: NbDialogRef<Country>) {
		// Automatically disbale loader
		this._countdown$.subscribe({ next: () => (this.isLoading = false) })
	}

	close() {
		this.dialogRef.close()
	}
}
