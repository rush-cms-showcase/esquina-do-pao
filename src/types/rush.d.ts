export interface NavItem {
	title: string
	url: string
	target?: string
	children?: NavItem[]
}

export interface NavConfig {
	main?: string
	topbar?: string
	footer?: string
	[key: string]: string | undefined
}

export interface TaxonomyPaths {
	categories: string
	tags: string
}

export interface FormsConfig {
	[key: string]: string
}

export interface LocaleConfig {
	code: string
	label: string
	path: string
	navs?: NavConfig
	forms?: FormsConfig
	taxonomies: TaxonomyPaths
	pagination: string
}

export interface RushSiteConfig {
	url?: string
	locales: Record<string, LocaleConfig>
	defaultLocale: string
	routes: Record<string, number>
	defaults: {
		perPage: number
	}
}

export interface CmsImage {
	id?: number
	url: string
	name?: string
	alt?: string
	width?: number
	height?: number
}

export interface CmsEntry {
	id: number
	slug: string
	title: string
	content?: string
	excerpt?: string
	description?: string
	featured_image?: CmsImage
	images?: CmsImage[]
	published_at?: string
	created_at: string
	updated_at?: string
	data?: Record<string, unknown>
	list?: CmsListItem[]
	about?: unknown
}

export interface CmsListItem {
	name?: string
	position?: string
	details?: string
	[key: string]: unknown
}

export interface RushMenuPrice {
	name?: string
	price: string
}

export interface RushMenuItem {
	id: string | number
	name: string
	description?: string
	price?: RushMenuPrice[]
}

export interface RushMenuCategoryData {
	extra?: string
	items?: RushMenuItem[]
}

export interface RushMenuCategory extends Omit<CmsEntry, 'data'> {
	data?: RushMenuCategoryData
}
