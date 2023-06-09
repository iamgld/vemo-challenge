// Angular Imports
import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core'
// This Module Imports
import { DialogChartsComponent } from '@dashboard/components'
import { DialogChartsName } from '@dashboard/models'
// Shared Imports
import { CountriesPerLanguage } from '@shared/models'
// Thirdparty Imports
import { ChartConfiguration, ChartData, ChartType } from 'chart.js'
import DatalabelsPlugin from 'chartjs-plugin-datalabels'
import { BaseChartDirective } from 'ng2-charts'
import { timer } from 'rxjs'
// Nebular Imports
import { NbDialogService } from '@nebular/theme'

@Component({
	selector: 'app-chart-countries-per-language',
	templateUrl: './chart-countries-per-language.component.html',
	styleUrls: ['./chart-countries-per-language.component.scss'],
})
export class ChartCountriesPerLanguageComponent implements OnChanges {
	@Input() countriesPerLanguage: CountriesPerLanguage[] = []
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
				position: 'top',
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
		if (changes['countriesPerLanguage'] && changes['countriesPerLanguage'].currentValue.length) {
			this.isLoading = true
			this._buildChartData(changes['countriesPerLanguage'].currentValue)
		}
	}

	openDialog(chartName: DialogChartsName) {
		this._dialog.open(DialogChartsComponent, {
			context: {
				currentChartName: chartName,
				countriesPerLanguage: this.countriesPerLanguage,
			},
		})
	}

	private _buildChartData(countriesPerLanguage: CountriesPerLanguage[]) {
		// Update Bar Chart
		const sortedByLanguageWithMostCountries = countriesPerLanguage.sort(
			(a: CountriesPerLanguage, b: CountriesPerLanguage) => b.countries.length - a.countries.length
		)
		const fiveLanguageWithMostCountries = sortedByLanguageWithMostCountries.slice(0, 5)
		this.barChartData = {
			labels: [
				...fiveLanguageWithMostCountries.map(
					(countriesPerLanguage: CountriesPerLanguage) => countriesPerLanguage.language.name
				),
			],
			datasets: [
				{
					data: [
						...fiveLanguageWithMostCountries.map(
							(countriesPerLanguage: CountriesPerLanguage) => countriesPerLanguage.countries.length
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
				...countriesPerLanguage.map(
					(countryPerLanguage: CountriesPerLanguage) => countryPerLanguage.language.name
				),
			],
			datasets: [
				{
					data: [
						...countriesPerLanguage.map(
							(countryPerContinent: CountriesPerLanguage) => countryPerContinent.countries.length
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
