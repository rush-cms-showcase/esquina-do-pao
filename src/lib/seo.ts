interface SeoSchemaInput {
	name: string
	description: string
	url: string
	image: string
	phone?: string
	email?: string
	sameAs?: string[]
	address?: {
		streetAddress?: string
		addressLocality?: string
		addressRegion?: string
		postalCode?: string
		addressCountry?: string
	}
}

export function toAbsoluteUrl(value: string, baseUrl: string): string {
	if (!value) return baseUrl
	if (value.startsWith('http://') || value.startsWith('https://')) return value
	return new URL(value.startsWith('/') ? value : `/${value}`, baseUrl).toString()
}

export function buildLocalBusinessSchema(input: SeoSchemaInput): string {
	const sameAs = (input.sameAs || []).filter(Boolean)

	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Bakery',
		name: input.name,
		description: input.description,
		url: input.url,
		image: input.image,
		telephone: input.phone,
		email: input.email,
		sameAs,
		address: input.address ? {
			'@type': 'PostalAddress',
			streetAddress: input.address.streetAddress,
			addressLocality: input.address.addressLocality,
			addressRegion: input.address.addressRegion,
			postalCode: input.address.postalCode,
			addressCountry: input.address.addressCountry || 'BR',
		} : undefined,
	}

	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: input.name,
		url: input.url,
	}

	return JSON.stringify([schema, websiteSchema])
}
