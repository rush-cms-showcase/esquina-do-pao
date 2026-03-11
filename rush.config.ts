import type { RushSiteConfig } from '@/types/rush'
import { RUSH_URL } from 'astro:env/client'
import { 
    RUSH_NAV_MAIN_ID, 
    RUSH_NAV_FOOTER_ID, 
    RUSH_FORM_CONTACT_ID,
    RUSH_ROUTE_ROOT_ID,
    RUSH_ROUTE_BLOG_ID
} from 'astro:env/server'

export const rushConfig: RushSiteConfig = {
    url: RUSH_URL,
    defaultLocale: 'pt_BR',

    locales: {
		pt_BR: {
			code: 'pt_BR',
			label: 'Português',
			path: '/',
			navs: {
				main: RUSH_NAV_MAIN_ID,
				footer: RUSH_NAV_FOOTER_ID,
			},
			forms: {
				contact: RUSH_FORM_CONTACT_ID,
			},
			taxonomies: {
				categories: 'categorias',
				tags: 'tags',
			},
			pagination: 'pagina',
		},
    },

    routes: {
        '/': RUSH_ROUTE_ROOT_ID,
        '/blog': RUSH_ROUTE_BLOG_ID,
    },

    defaults: {
        perPage: 12,
    },
}
