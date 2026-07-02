export default function ListElements({
	items = [],
	title,
	emptyText = 'Nenhum item encontrado',
	className = '',
	itemClassName = '',
	getKey,
	renderItem,
	}) {
	const list = Array.isArray(items) ? items : []

	return (
		<div className={className}>
			{title && <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">{title}</h3>}

			{list.length === 0 ? (
				<div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 px-4 py-6 text-sm text-zinc-500">
					{emptyText}
				</div>
			) : (
				<div className="space-y-3">
					{list.map((item, index) => {
						const key = getKey ? getKey(item, index) : item?.id ?? `${index}`

						return (
							<div
								key={key}
								className={`rounded-2xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-zinc-100 ${itemClassName}`}
							>
								{renderItem ? (
									renderItem(item, index)
								) : (
									<DefaultListItem item={item} />
								)}
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}

function DefaultListItem({ item }) {
	if (item === null || item === undefined) {
		return <span className="text-zinc-500">Item vazio</span>
	}

	if (typeof item !== 'object') {
		return <span>{String(item)}</span>
	}

	const primary = item.name ?? item.title ?? item.label ?? `Item ${item.id ?? ''}`.trim()
	const details = Object.entries(item)
		.filter(([key, value]) => !['id', 'name', 'title', 'label'].includes(key) && value !== null && value !== undefined && value !== '')
		.map(([key, value]) => `${key}: ${formatValue(value)}`)
		.join(' • ')

	return (
		<div className="space-y-1">
			<div className="font-medium text-zinc-100">{primary || 'Item'}</div>
			{details && <div className="text-sm text-zinc-500">{details}</div>}
		</div>
	)
}

function formatValue(value) {
	if (Array.isArray(value)) {
		return value.length > 0 ? `${value.length} item(s)` : 'vazio'
	}

	if (typeof value === 'object') {
		return JSON.stringify(value)
	}

	return String(value)
}
