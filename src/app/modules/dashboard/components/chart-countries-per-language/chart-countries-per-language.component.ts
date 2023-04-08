import { Component, ViewChild } from '@angular/core'
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js'
import { BaseChartDirective } from 'ng2-charts'

@Component({
	selector: 'app-chart-countries-per-language',
	templateUrl: './chart-countries-per-language.component.html',
	styleUrls: ['./chart-countries-per-language.component.scss'],
})
export class ChartCountriesPerLanguageComponent {
	@ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined

	// Pie
	public pieChartOptions: ChartConfiguration['options'] = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: 'top',
			},
		},
	}
	public pieChartData: ChartData<'pie', number[], string | string[]> = {
		labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
		datasets: [
			{
				data: [300, 500, 100],
			},
		],
	}
	public pieChartType: ChartType = 'pie'
	public pieChartPlugins = []

	// events
	public chartClicked({ event, active }: { event: ChartEvent; active: {}[] }): void {
		console.log(event, active)
	}

	public chartHovered({ event, active }: { event: ChartEvent; active: {}[] }): void {
		console.log(event, active)
	}

	changeLabels(): void {
		const words = [
			'hen',
			'variable',
			'embryo',
			'instal',
			'pleasant',
			'physical',
			'bomber',
			'army',
			'add',
			'film',
			'conductor',
			'comfortable',
			'flourish',
			'establish',
			'circumstance',
			'chimney',
			'crack',
			'hall',
			'energy',
			'treat',
			'window',
			'shareholder',
			'division',
			'disk',
			'temptation',
			'chord',
			'left',
			'hospital',
			'beef',
			'patrol',
			'satisfied',
			'academy',
			'acceptance',
			'ivory',
			'aquarium',
			'building',
			'store',
			'replace',
			'language',
			'redeem',
			'honest',
			'intention',
			'silk',
			'opera',
			'sleep',
			'innocent',
			'ignore',
			'suite',
			'applaud',
			'funny',
		]
		const randomWord = () => words[Math.trunc(Math.random() * words.length)]
		this.pieChartData.labels = new Array(3).map((_) => randomWord())

		this.chart?.update()
	}

	addSlice(): void {
		if (this.pieChartData.labels) {
			this.pieChartData.labels.push(['Line 1', 'Line 2', 'Line 3'])
		}

		this.pieChartData.datasets[0].data.push(400)

		this.chart?.update()
	}

	removeSlice(): void {
		if (this.pieChartData.labels) {
			this.pieChartData.labels.pop()
		}

		this.pieChartData.datasets[0].data.pop()

		this.chart?.update()
	}

	changeLegendPosition(): void {
		if (this.pieChartOptions?.plugins?.legend) {
			this.pieChartOptions.plugins.legend.position =
				this.pieChartOptions.plugins.legend.position === 'left' ? 'top' : 'left'
		}

		this.chart?.render()
	}

	toggleLegend(): void {
		if (this.pieChartOptions?.plugins?.legend) {
			this.pieChartOptions.plugins.legend.display = !this.pieChartOptions.plugins.legend.display
		}

		this.chart?.render()
	}
}
