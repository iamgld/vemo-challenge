import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ChartCountriesPerContinentComponent } from './chart-countries-per-continent.component'

describe('ChartCountriesPerContinentComponent', () => {
	let component: ChartCountriesPerContinentComponent
	let fixture: ComponentFixture<ChartCountriesPerContinentComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ChartCountriesPerContinentComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(ChartCountriesPerContinentComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
