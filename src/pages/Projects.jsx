import { useState, useEffect } from "react"
import { useProjects } from "../hook/useProjects"

export default function ProjectsContent() {
  const { 
    projects, 
    organizations, 
    loading, 
    error: hookError, 
    fetchProjects, 
    fetchOrganizations,
    handleCreateProject,
    handleDeleteProject
  } = useProjects()

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    key: "",
    organization: ""
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchProjects()
    fetchOrganizations()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!formData.name || !formData.key) {
      setError("Nome e Chave são obrigatórios")
      return
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      key: formData.key,
      ...(formData.organization && { organization: formData.organization })
    }

    const result = await handleCreateProject(payload)

    if (result.success) {
      setFormData({
        name: "",
        description: "",
        key: "",
        organization: ""
      })
      setShowForm(false)
      setSuccess("Projeto criado com sucesso!")
      setTimeout(() => setSuccess(""), 3000)
    } else {
      setError(result.error)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este projeto?")) return

    const result = await handleDeleteProject(id)

    if (result.success) {
      setSuccess("Projeto deletado com sucesso!")
      setTimeout(() => setSuccess(""), 3000)
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8 flex items-center justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2.5 bg-[#F4B315] hover:bg-[#E59312] text-[#1A141A] rounded-lg font-semibold transition-colors"
        >
          {showForm ? "Cancelar" : "+ Novo"}
        </button>
      </div>

      {/* Mensagens */}
      {success && (
        <div className="mb-4 p-4 bg-green-900/30 border border-green-600 text-green-300 rounded-lg">
          {success}
        </div>
      )}
      {(error || hookError) && (
        <div className="mb-4 p-4 bg-red-900/30 border border-red-600 text-red-300 rounded-lg">
          {error || hookError}
        </div>
      )}

      {/* Formulário */}
      {showForm && (
        <div className="mb-8 p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: HiveScrum Backend"
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#F4B315]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Chave *
                </label>
                <input
                  type="text"
                  name="key"
                  value={formData.key}
                  onChange={handleInputChange}
                  placeholder="Ex: SCRUN"
                  maxLength="10"
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#F4B315]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Descrição
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descreva o projeto..."
                rows="3"
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-[#F4B315]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Organização
              </label>
              <select
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-[#F4B315]"
              >
                <option value="">Selecione uma organização (opcional)</option>
                {organizations.map(org => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-2.5 bg-[#F4B315] hover:bg-[#E59312] text-[#1A141A] rounded-lg font-semibold transition-colors"
            >
              Criar Projeto
            </button>
          </form>
        </div>
      )}

      {/* Listagem */}
      {loading ? (
        <div className="text-center text-zinc-400 py-12">Carregando projetos...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 text-zinc-400">
          <p>Nenhum projeto criado ainda</p>
          <p className="text-sm mt-2">Clique em "+ Novo" para começar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project => (
            <div
              key={project.id}
              className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-[#F4B315] transition-colors"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold text-white">{project.name}</h3>
                <p className="text-sm text-[#F4B315] font-semibold">{project.key}</p>
              </div>

              {project.description && (
                <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
              )}

              {project.organization && (
                <p className="text-xs text-zinc-500 mb-4">
                  <span className="text-zinc-400">Organização:</span> {project.organization.name}
                </p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => {}}
                  className="flex-1 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-lg transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 px-3 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 text-sm rounded-lg transition-colors"
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
