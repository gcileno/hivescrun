import { useMemo, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import useOrganization from '../hook/useOrganization'
import RightSidebar from '../components/ui/RightSidebar'
import OrganizationForm from '../components/ui/forms/organization'

function getOrganizationOwnership(organization) {
	if (!organization) return { isOwner: false, label: 'organization' }

	if (typeof organization.is_owner === 'boolean') {
		return { isOwner: organization.is_owner, label: 'organization' }
	}

	if (typeof organization.owner === 'boolean') {
		return { isOwner: organization.owner, label: 'organization' }
	}

	if (typeof organization.owned === 'boolean') {
		return { isOwner: organization.owned, label: 'organization' }
	}

	if (typeof organization.role === 'string') {
		return { isOwner: organization.role.toLowerCase() === 'owner', label: 'organization' }
	}

	if (typeof organization.membership_role === 'string') {
		return { isOwner: organization.membership_role.toLowerCase() === 'owner', label: 'organization' }
	}

	if (organization.permissions?.role) {
		return { isOwner: String(organization.permissions.role).toLowerCase() === 'owner', label: 'organization' }
	}

	if (organization.created_by === organization.current_user_id) {
		return { isOwner: true, label: 'organization' }
	}

	return { isOwner: false, label: 'organization' }
}

function StatCard({ title, value, description, accentClass }) {
	return (
		<div className={`rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-5 shadow-lg shadow-black/20 ${accentClass}`}>
			<p className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">{title}</p>
			<div className="mt-4 flex items-end justify-between gap-4">
				<h2 className="text-4xl font-black tracking-tight text-zinc-100">{value}</h2>
				<div className="h-12 w-12 rounded-2xl border border-zinc-800 bg-zinc-900/70" />
			</div>
			<p className="mt-3 text-sm text-zinc-400">{description}</p>
		</div>
	)
}

export default function Organization() {
	const { user } = useOutletContext() || {}
	const { organizations, loading, error, handleCreateOrganization } = useOrganization(user?.id)
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [submitError, setSubmitError] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	const normalizedOrganizations = Array.isArray(organizations) ? organizations : []

	const counts = useMemo(() => {
		return normalizedOrganizations.reduce(
			(accumulator, organization) => {
				const { isOwner } = getOrganizationOwnership(organization)
				if (isOwner) {
					accumulator.owner += 1
				} else {
					accumulator.member += 1
				}
				return accumulator
			},
			{ owner: 0, member: 0 },
		)
	}, [normalizedOrganizations])

	const handleCreate = async (formData) => {
		setSubmitError('')
		setSuccessMessage('')

		const result = await handleCreateOrganization(formData)

		if (result.success) {
			setSidebarOpen(false)
			setSuccessMessage('Organização criada com sucesso!')
			setTimeout(() => setSuccessMessage(''), 3000)
			return
		}

		setSubmitError(result.error)
	}

	return (
		<div className="h-full overflow-y-auto bg-zinc-950 text-zinc-100">
			<div className="space-y-8 px-0 pb-8">
				<div className="flex items-center justify-end">
				</div>
				{(error || submitError) && (
					<div className="rounded-2xl border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-300">
						{error || submitError}
					</div>
				)}

				{successMessage && (
					<div className="rounded-2xl border border-emerald-900/60 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-300">
						{successMessage}
					</div>
				)}

				<div className="grid gap-4 lg:grid-cols-3">
					<StatCard
						title="Proprietárias"
						value={counts.owner}
						description="Organizações em que você é proprietário."
						accentClass="hover:border-[#F4B315]/50"
					/>

					<StatCard
						title="Não proprietárias"
						value={counts.member}
						description="Organizações em que você participa, mas não lidera."
						accentClass="hover:border-zinc-700"
					/>

					<button
						type="button"
						onClick={() => setSidebarOpen(true)}
						className="group rounded-3xl border border-dashed border-zinc-700 bg-zinc-950 p-5 text-left transition-all hover:border-[#F4B315]/50 hover:bg-zinc-900/60"
					>
						<p className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">Criar nova</p>
						<div className="mt-4 flex items-end justify-between gap-4">
							<h2 className="text-4xl font-black tracking-tight text-zinc-100 group-hover:text-[#F4B315]">+</h2>
							<div className="h-12 w-12 rounded-2xl border border-zinc-800 bg-zinc-900/70 transition-colors group-hover:border-[#F4B315]/50" />
						</div>
						<p className="mt-3 text-sm text-zinc-400">Abra o formulário lateral para cadastrar uma organização.</p>
					</button>
				</div>

				<section className="rounded-3xl border border-zinc-800 bg-zinc-950/60 shadow-xl shadow-black/20">
					<div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
						<div>
							<h2 className="text-lg font-semibold text-zinc-100">Lista de organizações</h2>
							<p className="text-sm text-zinc-500">Organizações carregadas da API.</p>
						</div>
						<div className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
							{normalizedOrganizations.length} itens
						</div>
					</div>

					{loading ? (
						<div className="px-5 py-10 text-sm text-zinc-400">Carregando organizações...</div>
					) : normalizedOrganizations.length === 0 ? (
						<div className="px-5 py-10 text-sm text-zinc-500">Nenhuma organização encontrada.</div>
					) : (
						<div className="divide-y divide-zinc-800">
							{normalizedOrganizations.map((organization) => {
								const { isOwner } = getOrganizationOwnership(organization)

								return (
									<div
										key={organization.id}
										className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-zinc-900/40 md:flex-row md:items-center md:justify-between"
									>
										<div>
											<h3 className="text-base font-semibold text-zinc-100">{organization.name}</h3>
											<p className="mt-1 text-sm text-zinc-500">CNPJ: {organization.cnpj || 'não informado'}</p>
											<Link to={`${organization.id}`} className="mt-2 inline-flex text-sm font-medium text-[#F4B315] hover:underline">
												Ver detalhes
											</Link>
										</div>

										<div className="flex items-center gap-3">
											<span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${isOwner ? 'border border-amber-500/30 bg-amber-500/10 text-amber-300' : 'border border-zinc-700 bg-zinc-900 text-zinc-400'}`}>
												{isOwner ? 'Proprietário' : 'Membro'}
											</span>
											<div className="text-right text-xs text-zinc-500">
												<p>ID: {organization.id}</p>
												<p>{Array.isArray(organization.members) ? `${organization.members.length} membros` : 'sem membros'}</p>
											</div>
										</div>
									</div>
								)
							})}
						</div>
					)}
				</section>
			</div>

			<RightSidebar
				isOpen={sidebarOpen}
				onClose={() => setSidebarOpen(false)}
				title="Criar organização"
				widthClass="w-full max-w-2xl"
			>
				<OrganizationForm
					onSubmit={handleCreate}
					onCancel={() => setSidebarOpen(false)}
					submitLabel="Criar organização"
					loading={loading}
				/>
			</RightSidebar>
		</div>
	)
}
