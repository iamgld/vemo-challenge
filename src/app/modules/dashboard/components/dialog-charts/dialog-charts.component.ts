// Angular Imports
import { Component } from '@angular/core'
// This Module Imports
import { DialogChartsName } from '@dashboard/models'
// Shared Imports
import { CountriesPerContinent, CountriesPerLanguage, Country } from '@shared/models'
// Nebular Imports
import { NbDialogRef } from '@nebular/theme'

@Component({
	selector: 'app-dialog-charts',
	templateUrl: './dialog-charts.component.html',
	styleUrls: ['./dialog-charts.component.scss'],
})
export class DialogChartsComponent {
	chartExpands = true
	currentChartName: DialogChartsName | null = null
	fiveMostPopulatedCountries: Country[] = []
	countriesPerContinent: CountriesPerContinent[] = []
	countriesPerLanguage: CountriesPerLanguage[] = []

	readonly DialogChartsName = DialogChartsName

	constructor(protected dialogRef: NbDialogRef<any>) {}

	close() {
		this.dialogRef.close()
	}
}
