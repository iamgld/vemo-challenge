export interface Country {
	name: string
	capitals: string[]
	currencies: string[]
	continents: string[]
	languages: string[]
	population: number
	flag: {
		imageUrl: string
		imageAlt: string
	}
}

export interface CountriesPerContinent {
	continent: string
	countries: Country[]
}
export interface CountriesPerLanguage {
	language: string
	countries: Country[]
}
