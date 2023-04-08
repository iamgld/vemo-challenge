import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DialogChartsComponent } from './dialog-charts.component'

describe('DialogChartsComponent', () => {
	let component: DialogChartsComponent
	let fixture: ComponentFixture<DialogChartsComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DialogChartsComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(DialogChartsComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
