// Angular Imports
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
// Store Imports
import { Store } from '@ngrx/store'
// Thirdparty Imports
import { Observable, of, map, startWith } from 'rxjs'

export interface Group {
	name: string
	children: string[]
}

@Component({
	selector: 'app-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
	groups: Group[] = []
	filteredGroups$!: Observable<Group[]>
	inputFormControl: FormControl = new FormControl('')

	constructor(private _store: Store) {}

	ngOnInit() {
		this.groups = [
			{
				name: 'Group 1',
				children: ['Option 11', 'Option 12', 'Option 13'],
			},
			{
				name: 'Group 2',
				children: ['Option 21', 'Option 22', 'Option 23'],
			},
			{
				name: 'Group 3',
				children: ['Option 31', 'Option 32', 'Option 33'],
			},
		]

		this.filteredGroups$ = of(this.groups)
		this.inputFormControl = new FormControl()

		this.filteredGroups$ = this.inputFormControl.valueChanges.pipe(
			startWith(''),
			map((filterString) => this.filter(filterString))
		)
	}

	private filterChildren(children: string[], filterValue: string) {
		return children.filter((optionValue) => optionValue.toLowerCase().includes(filterValue))
	}

	private filter(value: string): Group[] {
		const filterValue = value.toLowerCase()
		return this.groups
			.map((group) => {
				return {
					name: group.name,
					children: this.filterChildren(group.children, filterValue),
				}
			})
			.filter((group) => group.children.length)
	}

	trackByFn(index: number, item: any) {
		return item.name
	}
}
