import type { APIRoute } from 'astro'
import { rushCache } from '@/lib/rush/cache'
import { WEBHOOK_SECRET } from 'astro:env/server'

export const POST: APIRoute = async ({ request }) => {
	if (!WEBHOOK_SECRET) {
		return new Response('Webhook not configured', { status: 503 })
	}

	const secret = request.headers.get('x-webhook-secret')
	if (secret !== WEBHOOK_SECRET) {
		return new Response('Unauthorized', { status: 401 })
	}

	const body = await request.json().catch(() => ({})) as { key?: string }

	if (body.key) {
		rushCache.invalidate(body.key)
	} else {
		rushCache.invalidateAll()
	}

	return new Response(
		JSON.stringify({ invalidated: true, key: body.key ?? 'all' }),
		{ headers: { 'Content-Type': 'application/json' } }
	)
}
