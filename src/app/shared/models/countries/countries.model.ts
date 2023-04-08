export interface Country {
	name: string
	capitals: string[]
	currencies: CountryCurrency[]
	continents: string[]
	languages: CountryLanguage[]
	population: number
	flag: {
		imageUrl: string
		imageAlt: string
	}
}

export interface CountryLanguage {
	code: string
	name: string
}

export interface CountryCurrency {
	code: string
	name: string
}

export interface CountriesPerContinent {
	continent: string
	countries: Country[]
}
export interface CountriesPerLanguage {
	language: CountryLanguage
	countries: Country[]
}
