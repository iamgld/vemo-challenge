// Angular Imports
import { Component, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core'
// Shared Imports
import { Country } from '@shared/models'
// Thirdparty Imports
import { BaseChartDirective } from 'ng2-charts'
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js'
import { timer } from 'rxjs'

@Component({
	selector: 'app-chart-most-populated-countries',
	templateUrl: './chart-most-populated-countries.component.html',
	styleUrls: ['./chart-most-populated-countries.component.scss'],
})
export class ChartMostPopulatedCountriesComponent implements OnChanges {
	@Input() countries: Country[] = []
	@ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined
	isLoading = true

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
	barChartType: ChartType = 'bar'
	barChartPlugins = []

	barChartData: ChartData<'bar'> = {
		labels: [],
		datasets: [],
	}

	private _countdown$ = timer(2000)

	constructor() {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['countries'] && changes['countries'].currentValue.length) {
			this._buildChartData(changes['countries'].currentValue)
		}
	}

	private _buildChartData(countries: Country[]) {
		// Update chart data
		this.barChartData = {
			labels: [...countries.map((country: Country) => country.name)],
			datasets: [
				{
					data: [...countries.map((country: Country) => country.population)],
					label: 'Population',
					borderRadius: 8,
				},
			],
		}
		// Automatically disbale loader
		this._countdown$.subscribe({ next: () => (this.isLoading = false) })
	}
}
