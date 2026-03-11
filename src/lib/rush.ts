import { RushCMS } from "./rush/index"
import { rushConfig } from "../../rush.config"
import { RUSH_API_URL, RUSH_API_TOKEN, RUSH_SLUG } from "astro:env/server"

export const rush = new RushCMS({
    baseUrl: RUSH_API_URL,
    apiToken: RUSH_API_TOKEN,
    siteSlug: RUSH_SLUG
})

export type RouteKey = keyof typeof rushConfig.routes

export function getCollectionId(route: RouteKey): string {
    const id = rushConfig.routes[route]
    if (isNaN(id)) {
        throw new Error(`Invalid collection ID for route "${route}". Check your environment variables.`)
    }
    return String(id)
}
