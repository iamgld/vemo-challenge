// Angular Imports
import { Component, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core'
// This Module Imports
import { DialogChartsName } from '@dashboard/models'
import { DialogChartsComponent } from '@dashboard/components'
// Shared Imports
import { Country } from '@shared/models'
// Thirdparty Imports
import { BaseChartDirective } from 'ng2-charts'
import { ChartConfiguration, ChartData, ChartType } from 'chart.js'
import DataLabelsPlugin from 'chartjs-plugin-datalabels'
import { timer } from 'rxjs'
// Nebular Imports
import { NbDialogService } from '@nebular/theme'

@Component({
	selector: 'app-chart-most-populated-countries',
	templateUrl: './chart-most-populated-countries.component.html',
	styleUrls: ['./chart-most-populated-countries.component.scss'],
})
export class ChartMostPopulatedCountriesComponent implements OnChanges {
	@Input() countries: Country[] = []
	@Input() chartExpands: boolean = false
	@ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined
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
		if (changes['countries'] && changes['countries'].currentValue.length) {
			this.isLoading = true
			this._buildChartData(changes['countries'].currentValue)
		}
	}

	openDialog(chartName: DialogChartsName) {
		this._dialog.open(DialogChartsComponent, {
			context: {
				currentChartName: chartName,
				fiveMostPopulatedCountries: this.countries,
			},
		})
	}

	private _buildChartData(countries: Country[]) {
		// Update Bar Chart
		this.barChartData = {
			labels: [...countries.map((country: Country) => country.name)],
			datasets: [
				{
					data: [...countries.map((country: Country) => country.population)],
					label: 'Population',
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
			labels: [...countries.map((country: Country) => country.name)],
			datasets: [
				{
					data: [...countries.map((country: Country) => country.population)],
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
