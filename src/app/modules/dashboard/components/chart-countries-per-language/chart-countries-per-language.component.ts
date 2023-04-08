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
	pieChartType: ChartType = 'pie'
	pieChartPlugins = [DatalabelsPlugin]

	readonly DialogChartsName = DialogChartsName
	private _countdown$ = timer(2000)

	constructor(private _dialog: NbDialogService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['countriesPerLanguage'] && changes['countriesPerLanguage'].currentValue.length) {
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
		// Update chart data
		const updatePieChartData = (countriesPerLanguage: CountriesPerLanguage[]) => {
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
						label: 'Languages',
						backgroundColor: '#A16EFF',
						borderColor: '#1B1B39',
						hoverBorderColor: '#3CD78F',
						hoverBackgroundColor: '#1B1B39',
						borderWidth: 2,
					},
				],
			}
		}

		// Show legends when charts was expanded
		if (this.chartExpands) {
			this.pieChartOptions = {
				...this.pieChartOptions,
				plugins: {
					legend: {
						display: true,
						position: 'top',
					},
				},
			}
			this.pieChartPlugins = []
			updatePieChartData(countriesPerLanguage)
		} else {
			// pieChartPlugins = [DatalabelsPlugin]
			const sortedByLanguageWithMostCountries = countriesPerLanguage.sort(
				(a: CountriesPerLanguage, b: CountriesPerLanguage) =>
					b.countries.length - a.countries.length
			)
			const fiveLanguageWithMostCountries = sortedByLanguageWithMostCountries.slice(0, 5)

			updatePieChartData(fiveLanguageWithMostCountries)
		}
		// Automatically disbale loader
		this._countdown$.subscribe({ next: () => (this.isLoading = false) })
	}
}
