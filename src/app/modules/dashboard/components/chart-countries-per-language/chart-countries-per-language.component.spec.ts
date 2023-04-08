import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ChartCountriesPerLanguageComponent } from './chart-countries-per-language.component'

describe('ChartCountriesPerLanguageComponent', () => {
	let component: ChartCountriesPerLanguageComponent
	let fixture: ComponentFixture<ChartCountriesPerLanguageComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ChartCountriesPerLanguageComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(ChartCountriesPerLanguageComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
