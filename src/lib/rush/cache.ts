interface CacheEntry<T> {
	data: T
	freshUntil: number
	validUntil: number
}

class RushCache {
	private store = new Map<string, CacheEntry<unknown>>()

	get<T>(key: string): { data: T; isStale: boolean } | null {
		const entry = this.store.get(key)
		if (!entry || Date.now() > entry.validUntil) return null
		return {
			data: entry.data as T,
			isStale: Date.now() > entry.freshUntil,
		}
	}

	set<T>(key: string, data: T, freshTtl = 60, staleTtl = 300): void {
		this.store.set(key, {
			data,
			freshUntil: Date.now() + freshTtl * 1000,
			validUntil: Date.now() + staleTtl * 1000,
		})
	}

	invalidate(keyOrPrefix: string): void {
		for (const key of this.store.keys()) {
			if (key.startsWith(keyOrPrefix)) {
				this.store.delete(key)
			}
		}
	}

	invalidateAll(): void {
		this.store.clear()
	}
}

export const rushCache = new RushCache()
