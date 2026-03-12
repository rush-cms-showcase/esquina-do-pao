import { rushCache } from './cache'

export interface RushClientConfig {
	baseUrl: string
	apiToken: string
	siteSlug: string
}

export class RushClient {
	protected baseUrl: string
	protected apiToken: string
	protected siteSlug: string

	constructor(config: RushClientConfig) {
		this.baseUrl = config.baseUrl
		this.apiToken = config.apiToken
		this.siteSlug = config.siteSlug
	}

	private async doFetch<T>(url: string, options: RequestInit, headers: Record<string, string>): Promise<T> {
		const response = await fetch(url, { ...options, headers })
		if (!response.ok) {
			throw new Error(`RushCMS API Error: ${response.status} ${response.statusText} — ${url}`)
		}
		return response.json() as Promise<T>
	}

	async request<T>(endpoint: string, params: Record<string, any> = {}, options: RequestInit = {}): Promise<T> {
		const queryParams = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				if (key === 'include') {
					value.forEach(v => queryParams.append(`${key}[]`, String(v)))
				} else {
					queryParams.set(key, value.join(','))
				}
			} else if (value !== undefined && value !== null) {
				queryParams.set(key, String(value))
			}
		})

		const qs = queryParams.toString()
		const url = `${this.baseUrl}/${this.siteSlug}${endpoint}${qs ? `?${qs}` : ''}`

		const headers: Record<string, string> = {
			Authorization: `Bearer ${this.apiToken}`,
			Accept: 'application/json',
			...((options.headers as Record<string, string>) || {}),
		}

		if (params.locale) {
			headers['Accept-Language'] = String(params.locale)
		}

		const isGet = !options.method || options.method.toUpperCase() === 'GET'

		if (isGet) {
			const cached = rushCache.get<T>(url)
			if (cached) {
				if (cached.isStale) {
					// Serve stale imediatamente, revalida em background
					this.doFetch<T>(url, options, headers)
						.then(data => rushCache.set(url, data))
						.catch(() => {})
				}
				return cached.data
			}
		}

		const data = await this.doFetch<T>(url, options, headers)
		if (isGet) rushCache.set(url, data)
		return data
	}

	async post<T>(endpoint: string, body: any, params: Record<string, any> = {}): Promise<T> {
		return this.request<T>(endpoint, params, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}
}
