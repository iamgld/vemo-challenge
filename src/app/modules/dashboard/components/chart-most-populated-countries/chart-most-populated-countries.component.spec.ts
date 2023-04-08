import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ChartMostPopulatedCountriesComponent } from './chart-most-populated-countries.component'

describe('ChartMostPopulatedCountriesComponent', () => {
	let component: ChartMostPopulatedCountriesComponent
	let fixture: ComponentFixture<ChartMostPopulatedCountriesComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ChartMostPopulatedCountriesComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(ChartMostPopulatedCountriesComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
