// Angular Imports
import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core'
// Shared Imports
import { CountriesPerContinent } from '@shared/models'
// Thirdparty Imports
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js'
import { BaseChartDirective } from 'ng2-charts'
import { timer } from 'rxjs'

@Component({
	selector: 'app-chart-countries-per-continent',
	templateUrl: './chart-countries-per-continent.component.html',
	styleUrls: ['./chart-countries-per-continent.component.scss'],
})
export class ChartCountriesPerContinentComponent implements OnChanges {
	@Input() countriesPerContinent: CountriesPerContinent[] = []
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
	pieChartPlugins = []

	private _countdown$ = timer(2000)

	constructor() {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['countriesPerContinent'] && changes['countriesPerContinent'].currentValue.length) {
			this._buildChartData(changes['countriesPerContinent'].currentValue)
		}
	}

	private _buildChartData(countriesPerContinent: CountriesPerContinent[]) {
		// Update chart data
		this.pieChartData = {
			labels: [
				...countriesPerContinent.map(
					(countriesPerContinent: CountriesPerContinent) => countriesPerContinent.continent
				),
			],
			datasets: [
				{
					data: [
						...countriesPerContinent.map(
							(countriesPerContinent: CountriesPerContinent) =>
								countriesPerContinent.countries.length
						),
					],
					label: 'Countries',
					// borderRadius: 8,
				},
			],
		}
		console.log(countriesPerContinent)

		// Automatically disbale loader
		this._countdown$.subscribe({ next: () => (this.isLoading = false) })
	}
}
