import { useEffect, useState } from 'react'
import { organizationInput } from '../../../models/organizationModel.js'

const initialFormState = {
	name: '',
	cnpj: '',
	members: [],
}

export default function OrganizationForm({
	initialData = null,
	onSubmit,
	onCancel,
	submitLabel = 'Salvar organização',
	loading = false,
	}) {
	const [formData, setFormData] = useState(initialFormState)
	const [membersText, setMembersText] = useState('')

	useEffect(() => {
		const normalized = organizationInput(initialData) || initialFormState
		setFormData(normalized)
		setMembersText(Array.isArray(normalized.members) ? normalized.members.join(', ') : '')
	}, [initialData])

	const handleChange = (event) => {
		const { name, value } = event.target
		setFormData((currentData) => ({
			...currentData,
			[name]: value,
		}))
	}

	const handleMembersChange = (event) => {
		const value = event.target.value
		setMembersText(value)
		setFormData((currentData) => ({
			...currentData,
			members: value
				.split(/[\n,]/)
				.map((member) => member.trim())
				.filter(Boolean),
		}))
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		const payload = {
			...formData,
			members: membersText
				.split(/[\n,]/)
				.map((member) => member.trim())
				.filter(Boolean),
		}

		onSubmit?.(payload)
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-xl shadow-black/20">
			<div>
				<h2 className="text-lg font-semibold text-zinc-100">Organização</h2>
				<p className="mt-1 text-sm text-zinc-500">Preencha os dados do modelo de organização.</p>
			</div>

			<div className="space-y-4">
				<label className="block space-y-2">
					<span className="text-sm font-medium text-zinc-300">Nome</span>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Nome da organização"
						className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-600"
						required
					/>
				</label>

				<label className="block space-y-2">
					<span className="text-sm font-medium text-zinc-300">CNPJ</span>
					<input
						type="text"
						name="cnpj"
						value={formData.cnpj}
						onChange={handleChange}
						placeholder="00.000.000/0000-00"
						className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-600"
					/>
				</label>

				<label className="block space-y-2">
					<span className="text-sm font-medium text-zinc-300">Membros</span>
					<textarea
						name="members"
						value={membersText}
						onChange={handleMembersChange}
						placeholder="Digite nomes ou IDs separados por vírgula ou quebra de linha"
						rows={4}
						className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-600"
					/>
					<p className="text-xs text-zinc-500">O valor será enviado como array no formato do model.</p>
				</label>
			</div>

			<div className="flex items-center justify-end gap-3 pt-2">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="rounded-xl border border-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
					>
						Cancelar
					</button>
				)}

				<button
					type="submit"
					disabled={loading}
					className="rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
				>
					{loading ? 'Salvando...' : submitLabel}
				</button>
			</div>
		</form>
	)
}
