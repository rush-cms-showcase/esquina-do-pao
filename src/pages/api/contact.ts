import type { APIRoute } from 'astro'
import { rush } from '@/lib/rush'
import { rushConfig } from 'rush.config'

function sanitize(value: FormDataEntryValue | null): string {
	if (typeof value !== 'string') return ''
	return value.trim()
}

export const POST: APIRoute = async ({ request }) => {
	const formId = rushConfig.locales[rushConfig.defaultLocale]?.forms?.contact

	if (!formId) {
		return new Response(JSON.stringify({ ok: false, message: 'Formulário indisponível no momento.' }), {
			status: 503,
			headers: { 'Content-Type': 'application/json' },
		})
	}

	const formData = await request.formData()

	// Honeypot anti-spam field must stay empty
	if (sanitize(formData.get('company'))) {
		return new Response(JSON.stringify({ ok: true, message: 'Mensagem enviada com sucesso.' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	}

	const name = sanitize(formData.get('name'))
	const email = sanitize(formData.get('email'))
	const phone = sanitize(formData.get('phone'))
	const message = sanitize(formData.get('message'))

	if (!name || !email || !message) {
		return new Response(JSON.stringify({ ok: false, message: 'Preencha nome, e-mail e mensagem.' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		})
	}

	try {
		await rush.forms.submit(formId, {
			name,
			email,
			phone,
			message,
			source: 'site-contato',
			page: '/contato',
		})

		return new Response(JSON.stringify({ ok: true, message: 'Mensagem enviada com sucesso. Retornaremos em breve.' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		console.error('Contact form submit failed:', error)
		return new Response(JSON.stringify({ ok: false, message: 'Não foi possível enviar agora. Tente novamente em alguns minutos.' }), {
			status: 502,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}
