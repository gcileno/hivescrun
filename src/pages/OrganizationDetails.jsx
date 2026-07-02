import { useEffect, useMemo, useState } from 'react'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import * as organizationsService from '../service/organizationsService'

function getMemberName(member) {
	if (!member) return 'Membro'
	if (typeof member === 'string') return member
	if (member.name) return member.name
	if (member.member?.name) return member.member.name
	if (member.user?.username) return member.user.username
	if (member.user?.email) return member.user.email
	return `Membro ${member.id || ''}`.trim()
}

function formatDate(value) {
	if (!value) return 'não informado'
	const date = new Date(value)
	return Number.isNaN(date.getTime()) ? value : date.toLocaleString('pt-BR')
}

export default function OrganizationDetails() {
	const { user } = useOutletContext() || {}
	const { organizationId } = useParams()
	const [organization, setOrganization] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [inviteEmail, setInviteEmail] = useState('')
	const [inviteLoading, setInviteLoading] = useState(false)
	const [inviteError, setInviteError] = useState('')
	const [inviteSuccess, setInviteSuccess] = useState('')

	useEffect(() => {
		async function fetchOrganization() {
			try {
				setLoading(true)
				setError('')
				const data = await organizationsService.getOrganizationById(organizationId)
				setOrganization(data)
			} catch (err) {
				setError(err.response?.data?.detail || 'Erro ao carregar detalhes da organização')
			} finally {
				setLoading(false)
			}
		}

		if (organizationId) {
			fetchOrganization()
		}
	}, [organizationId])

	const members = useMemo(() => {
		return Array.isArray(organization?.members) ? organization.members : []
	}, [organization])

	const handleInvite = async (event) => {
		event.preventDefault()
		if (!inviteEmail.trim()) return

		try {
			setInviteLoading(true)
			setInviteError('')
			setInviteSuccess('')
			await organizationsService.createOrganizationInvitation({
				email: inviteEmail.trim(),
				organization: organization?.id || organizationId,
			})
			setInviteEmail('')
			setInviteSuccess('Convite enviado com sucesso.')
		} catch (err) {
			setInviteError(err.response?.data?.detail || 'Erro ao enviar convite')
		} finally {
			setInviteLoading(false)
		}
	}

	if (loading) {
		return <div className="px-5 py-10 text-sm text-zinc-400">Carregando detalhes da organização...</div>
	}

	if (error) {
		return <div className="rounded-2xl border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-300">{error}</div>
	}

	if (!organization) {
		return <div className="px-5 py-10 text-sm text-zinc-500">Organização não encontrada.</div>
	}

	return (
		<div className="space-y-6 text-zinc-100">
			<div className="flex items-center justify-between gap-4">
				<div>
					<p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Detalhes</p>
					<h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-100">{organization.name}</h1>
					<p className="mt-1 text-sm text-zinc-500">CNPJ: {organization.cnpj || 'não informado'}</p>
				</div>
				<Link
					to=".."
					relative="path"
					className="rounded-xl border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
				>
					Voltar
				</Link>
			</div>

			<div className="grid gap-4 lg:grid-cols-3">
				<div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-5">
					<p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Diretor</p>
					<p className="mt-3 text-lg font-semibold text-zinc-100">{getMemberName(organization.director)}</p>
				</div>

				<div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-5">
					<p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Membros</p>
					<p className="mt-3 text-lg font-semibold text-zinc-100">{members.length}</p>
				</div>

				<div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-5">
					<p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Criada em</p>
					<p className="mt-3 text-lg font-semibold text-zinc-100">{formatDate(organization.createdAt)}</p>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
				<section className="rounded-3xl border border-zinc-800 bg-zinc-950/60 shadow-xl shadow-black/20">
					<div className="border-b border-zinc-800 px-5 py-4">
						<h2 className="text-lg font-semibold text-zinc-100">Membros da organização</h2>
						<p className="text-sm text-zinc-500">Lista recebida da API.</p>
					</div>
					{members.length === 0 ? (
						<div className="px-5 py-10 text-sm text-zinc-500">Nenhum membro encontrado.</div>
					) : (
						<div className="divide-y divide-zinc-800">
							{members.map((member) => (
								<div key={member.id || getMemberName(member)} className="px-5 py-4">
									<p className="font-medium text-zinc-100">{getMemberName(member)}</p>
									<p className="mt-1 text-sm text-zinc-500">{member.email || member.user?.email || 'sem email informado'}</p>
								</div>
							))}
						</div>
					)}
				</section>

				<section className="rounded-3xl border border-zinc-800 bg-zinc-950/60 shadow-xl shadow-black/20">
					<div className="border-b border-zinc-800 px-5 py-4">
						<h2 className="text-lg font-semibold text-zinc-100">Enviar convite</h2>
						<p className="text-sm text-zinc-500">Cria uma Invitation com o e-mail e a organização selecionada.</p>
					</div>

					<form onSubmit={handleInvite} className="space-y-4 px-5 py-5">
						<div className="space-y-2">
							<label className="text-sm font-medium text-zinc-300">E-mail do convidado</label>
							<input
								type="email"
								value={inviteEmail}
								onChange={(event) => setInviteEmail(event.target.value)}
								placeholder="convidado@exemplo.com"
								className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-600"
								required
							/>
						</div>

						{inviteError ? <p className="text-sm text-red-300">{inviteError}</p> : null}
						{inviteSuccess ? <p className="text-sm text-emerald-300">{inviteSuccess}</p> : null}

						<div className="flex items-center justify-end gap-3">
							<button
								type="submit"
								disabled={inviteLoading}
								className="rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
							>
								{inviteLoading ? 'Enviando...' : 'Enviar convite'}
							</button>
						</div>
					</form>
				</section>
			</div>
		</div>
	)
}