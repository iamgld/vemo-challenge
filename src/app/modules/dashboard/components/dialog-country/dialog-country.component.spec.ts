import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DialogCountryComponent } from './dialog-country.component'

describe('DialogCountryComponent', () => {
	let component: DialogCountryComponent
	let fixture: ComponentFixture<DialogCountryComponent>

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DialogCountryComponent],
		}).compileComponents()

		fixture = TestBed.createComponent(DialogCountryComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
