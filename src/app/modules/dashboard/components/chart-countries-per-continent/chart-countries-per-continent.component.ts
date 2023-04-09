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
	pieChartPlugins = []
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

	barChartType: ChartType = 'bar'
	barChartPlugins = []
	barChartOptions: ChartConfiguration['options'] = {
		indexAxis: 'y',
		scales: {
			x: {},
			y: {},
		},
		plugins: {
			legend: {
				position: 'top',
			},
		},
	}
	barChartData: ChartData<'bar'> = {
		labels: [],
		datasets: [],
	}

	readonly DialogChartsName = DialogChartsName
	private _countdown$ = timer(750)

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
		// Update Bar Chart
		const sortedByContinentsWithMostCountries = countriesPerContinent.sort(
			(a: CountriesPerContinent, b: CountriesPerContinent) =>
				b.countries.length - a.countries.length
		)
		this.barChartData = {
			labels: [
				...sortedByContinentsWithMostCountries.map(
					(countriesPerContinent: CountriesPerContinent) => countriesPerContinent.continent
				),
			],
			datasets: [
				{
					data: [
						...sortedByContinentsWithMostCountries.map(
							(countriesPerContinent: CountriesPerContinent) =>
								countriesPerContinent.countries.length
						),
					],
					label: 'Countries',
					borderRadius: 8,
					backgroundColor: '#A16EFF',
					borderColor: '#1B1B39',
					// hoverBorderColor: '#3CD78F',
					hoverBackgroundColor: '#3CD78F',
					borderWidth: 2,
				},
			],
		}
		// Update Pie Chart
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
					// hoverBorderColor: '#3CD78F',
					hoverBackgroundColor: '#3CD78F',
					borderWidth: 2,
				},
			],
		}
		// Automatically disbale loader
		this._countdown$.subscribe({ next: () => (this.isLoading = false) })
	}
}
