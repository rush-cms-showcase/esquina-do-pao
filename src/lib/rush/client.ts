export interface RushClientConfig {
    baseUrl: string;
    apiToken: string;
    siteSlug: string;
}

export class RushClient {
    protected baseUrl: string;
    protected apiToken: string;
    protected siteSlug: string;

    constructor(config: RushClientConfig) {
        this.baseUrl = config.baseUrl;
        this.apiToken = config.apiToken;
        this.siteSlug = config.siteSlug;
    }

    async request<T>(endpoint: string, params: Record<string, any> = {}, options: RequestInit = {}): Promise<T> {
        const queryParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                if (key === 'include') {
                     value.forEach(v => queryParams.append(`${key}[]`, String(v)));
                } else {
                     queryParams.set(key, value.join(','));
                }
            } else if (value !== undefined && value !== null) {
                queryParams.set(key, String(value));
            }
        });

        const qs = queryParams.toString();
        const url = `${this.baseUrl}/${this.siteSlug}${endpoint}${qs ? `?${qs}` : ''}`;
        
        const headers: Record<string, string> = {
            "Authorization": `Bearer ${this.apiToken}`,
            "Accept": "application/json",
            ...((options.headers as Record<string, string>) || {})
        };

        if (params.locale) {
            headers["Accept-Language"] = String(params.locale);
        }

        const response = await fetch(url, { ...options, headers });

        if (!response.ok) {
            throw new Error(`RushCMS API Error: ${response.status} ${response.statusText} — ${url}`);
        }

        return await response.json();
    }

    async post<T>(endpoint: string, body: any, params: Record<string, any> = {}): Promise<T> {
        return this.request<T>(endpoint, params, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
