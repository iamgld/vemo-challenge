// Angular Imports
import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core'
import { DialogChartsName } from '@dashboard/models'
// This Module Imports
import { DialogChartsComponent } from '@dashboard/components'
// Shared Imports
import { CountriesPerContinent } from '@shared/models'
// Thirdparty Imports
import { ChartConfiguration, ChartData, ChartType } from 'chart.js'
import DatalabelsPlugin from 'chartjs-plugin-datalabels'
import { BaseChartDirective } from 'ng2-charts'
import { timer } from 'rxjs'
// Nebular Imports
import { NbDialogService } from '@nebular/theme'

@Component({
	selector: 'app-chart-countries-per-continent',
	templateUrl: './chart-countries-per-continent.component.html',
	styleUrls: ['./chart-countries-per-continent.component.scss'],
})
export class ChartCountriesPerContinentComponent implements OnChanges {
	@Input() countriesPerContinent: CountriesPerContinent[] = []
	@Input() chartExpands: boolean = false
	@ViewChild(BaseChartDirective)
	chart: BaseChartDirective | undefined
	isLoading = true

	pieChartType: ChartType = 'pie'
	pieChartPlugins = [DatalabelsPlugin]
	pieChartOptions: ChartConfiguration['options'] = {
		plugins: {
			legend: {
				display: true,
				position: 'left',
			},
		},
	}
	pieChartData: ChartData<'pie', number[], string | string[]> = {
		labels: [],
		datasets: [],
	}

	readonly DialogChartsName = DialogChartsName
	private _countdown$ = timer(1000)

	constructor(private _dialog: NbDialogService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['countriesPerContinent'] && changes['countriesPerContinent'].currentValue.length) {
			this.isLoading = true
			this._buildChartData(changes['countriesPerContinent'].currentValue)
		}
	}

	openDialog(chartName: DialogChartsName) {
		this._dialog.open(DialogChartsComponent, {
			context: {
				currentChartName: chartName,
				countriesPerContinent: this.countriesPerContinent,
			},
		})
	}

	private _buildChartData(countriesPerContinent: CountriesPerContinent[]) {
		// Update chart data
		this.pieChartData = {
			labels: [
				...countriesPerContinent.map(
					(countryPerContinent: CountriesPerContinent) => countryPerContinent.continent
				),
			],
			datasets: [
				{
					data: [
						...countriesPerContinent.map(
							(countryPerContinent: CountriesPerContinent) => countryPerContinent.countries.length
						),
					],
					label: 'Countries',
					backgroundColor: '#A16EFF',
					borderColor: '#1B1B39',
					hoverBorderColor: '#3CD78F',
					hoverBackgroundColor: '#1B1B39',
					borderWidth: 2,
				},
			],
		}
		// Automatically disbale loader
		this._countdown$.subscribe({ next: () => (this.isLoading = false) })
	}
}
