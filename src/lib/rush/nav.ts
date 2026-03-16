import type { NavItem } from '@/types/rush'
import { rushConfig } from '../../../rush.config'

export function getRouteForCollection(collectionId: number | string): string {
	const entry = Object.entries(rushConfig.routes).find(([, id]) => String(id) === String(collectionId))
	return entry ? entry[0] : '#'
}

function resolveUrl(item: Record<string, any>): string {
	if (item.type === 'url') {
		return item.url || '#'
	}

	if (item.type === 'collection') {
		const id = item.collection?.id
		if (!id) return '#'

		const slug = item.collection?.slug?.pt_BR || item.collection?.slug
		if (typeof slug === 'string' && slug.length > 0) {
			return `/${slug.replace(/^\//, '')}`
		}

		return getRouteForCollection(id)
	}

	if (item.type === 'entry') {
		const slug = item.entry?.slug?.pt_BR || item.entry?.slug
		if (typeof slug === 'string' && slug.length > 0) {
			return `/${slug.replace(/^\//, '')}`
		}
		return '#'
	}

	return item.url || '#'
}

export function mapMenuItem(item: Record<string, any>): NavItem {
	return {
		title: item.title || '',
		url: resolveUrl(item),
		target: item.target || '_self',
		children: Array.isArray(item.children) ? item.children.map(mapMenuItem) : [],
	}
}

export function extractMenuItems(menuResponse: any): any[] {
	if (Array.isArray(menuResponse)) return menuResponse
	if (Array.isArray(menuResponse?.items)) return menuResponse.items
	if (Array.isArray(menuResponse?.data?.items)) return menuResponse.data.items
	if (Array.isArray(menuResponse?.data)) return menuResponse.data
	return []
}
