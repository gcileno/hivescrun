import { useState } from "react"
import { HexLogo } from "../ui/HexLogo"
import Icon from "../ui/Icon"

const ICONS = {
  profile: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  projects: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  sprints: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  tasks: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2",
  team: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197",
  organizations: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 19.477 5.754 20 7.5 20s3.332-.523 4.5-1.747v-13C15.832 5.477 14.246 5 12.5 5S9.168 5.477 8 6.253z",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z",
  chevron: "M19 9l-7 7-7-7"
}

export function Navbar({ active, setActive, projects = [], organizations = [] }) {

  const [collapsed, setCollapsed] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(true)
  const [organizationsOpen, setOrganizationsOpen] = useState(true)

  const projectItems = Array.isArray(projects) ? projects : []
  const organizationItems = Array.isArray(organizations) ? organizations : []
  
  const getProjectLabel = (project, index) => {
    if (typeof project === "string") return project
    return project?.name || `Projeto ${index + 1}`
  }

  const getOrganizationLabel = (org, index) => {
    if (typeof org === "string") return org
    return org?.name || `Organização ${index + 1}`
  }

  const isProjectActive = projectItems.some((project, index) => getProjectLabel(project, index) === active)
  const isOrganizationActive = organizationItems.some((org, index) => getOrganizationLabel(org, index) === active)

  return (
    <aside className={`h-screen flex flex-col transition-all duration-300 border-r border-zinc-900 bg-zinc-950 ${collapsed ? "w-20" : "w-[300px]"}`}>
      
      {/* HEADER - Minimalista e imponente (Visual da Imagem Escura) */}
      <div className={`p-8 mb-6 h-28 flex items-center ${collapsed ? "justify-center px-0" : "px-8"}`}>
        <div className="flex items-center gap-4">
          {/* Inserção da sua Logo Hexagonal */}
          <div className="shrink-0">
            <HexLogo />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white tracking-tight leading-none">HiveScrum</h1>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.25em] mt-1.5">Free Edition</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 px-5 space-y-2">
        {!collapsed && (
          <p className="px-4 text-[11px] font-bold text-zinc-600 uppercase tracking-widest mb-4 mt-2">Workspace</p>
        )}
        
        <NavItem icon="profile" label="profile" active={active === "profile"} onClick={() => setActive("profile")} collapsed={collapsed} />
        
        {/* Projetos Integrados - Visual High-End */}
        <div className="flex flex-col">
          <NavItem icon="projects" label="Projetos Ativos" active={isProjectActive} onClick={() => !collapsed && setProjectsOpen(!projectsOpen)} collapsed={collapsed} hasSub={!collapsed} isOpen={projectsOpen} />
          
          {!collapsed && projectsOpen && (
            <div className="mt-2 space-y-1.5 transition-all">
              {projectItems.length > 0 ? (
                projectItems.map((project, index) => {
                  const label = getProjectLabel(project, index)
                  const key = typeof project === "object" && project?.id != null ? project.id : `${label}-${index}`

                  return (
                    <SubItem
                      key={key}
                      label={label}
                      active={active === label}
                      onClick={() => setActive(label)}
                    />
                  )
                })
              ) : (
                <SubItem label="Sem projetos" active={false} onClick={() => {}} />
              )}
            </div>
          )}
        </div>

        {/* Organizations do usuário logado - Visual High-End */}
        <div className="flex flex-col">
          <NavItem icon="organizations" label="Organizations" active={isOrganizationActive} onClick={() => !collapsed && setOrganizationsOpen(!organizationsOpen)} collapsed={collapsed} hasSub={!collapsed} isOpen={organizationsOpen} />
          
          {!collapsed && organizationsOpen && (
            <div className="mt-2 space-y-1.5 transition-all">
              {organizationItems.length > 0 ? (
                organizationItems.map((org, index) => {
                  const label = getOrganizationLabel(org, index)
                  const key = typeof org === "object" && org?.id != null ? org.id : `${label}-${index}`

                  return (
                    <SubItem
                      key={key}
                      label={label}
                      active={active === label}
                      onClick={() => setActive(label)}
                    />
                  )
                })
              ) : (
                <SubItem label="Sem organizações" active={false} onClick={() => {}} />
              )}
            </div>
          )}
        </div>

        <NavItem icon="sprints" label="Sprints" active={active === "sprints"} onClick={() => setActive("sprints")} collapsed={collapsed} />
        <NavItem icon="tasks" label="Minhas Tarefas" active={active === "tasks"} onClick={() => setActive("tasks")} collapsed={collapsed} />
        <NavItem icon="team" label="Membros do Time" active={active === "team"} onClick={() => setActive("team")} collapsed={collapsed} />
      </nav>

      {/* FOOTER */}
      <div className="p-6 border-t border-zinc-900 bg-zinc-900/10">
        <NavItem icon="settings" label="Configurações" active={active === "settings"} onClick={() => setActive("settings")} collapsed={collapsed} />
        
        <button onClick={() => setCollapsed(!collapsed)} className="flex items-center justify-center w-10 h-10 mx-auto mt-3 rounded-xl hover:bg-zinc-900 text-zinc-600 hover:text-active transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={collapsed ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} />
          </svg>
        </button>
      </div>
    </aside>
  )
}

function NavItem({ icon, label, active, onClick, collapsed, hasSub, isOpen }) {
  return (
    <button
      onClick={onClick}
      className={`group w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 relative
      ${collapsed ? "justify-center" : "justify-between"}
      ${active ? "bg-zinc-900 text-active" : "text-zinc-500 hover:bg-zinc-900/60 hover:text-zinc-100"}`}
    >
      <div className="flex items-center gap-4">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={active ? "text-active shadow-[0_0_10px_rgba(0,246,255,0.4)]" : "text-zinc-600 group-hover:text-zinc-400"}>
          <path d={ICONS[icon]} />
        </svg>
        
        {!collapsed && (
          <span className={`text-[15px] tracking-tight ${active ? "font-bold" : "font-medium"}`}>{label}</span>
        )}
      </div>

      {!collapsed && hasSub && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform text-zinc-600 group-hover:text-zinc-400 ${isOpen ? "rotate-180" : ""}`}>
          <path d={ICONS.chevron} />
        </svg>
      )}

      {/* Indicador lateral sutil da imagem */}
      {active && !collapsed && (
        <div className="absolute right-4 w-1 h-1 rounded-full bg-active shadow-[0_0_10px_rgba(0,246,255,0.8)]" />
      )}
    </button>
  )
}

function SubItem({ label, active, onClick }) {
  return (
    <button onClick={onClick} className={`w-full py-2.5 px-4 rounded-xl text-[14px] transition-all flex items-center justify-between ${active ? "bg-zinc-900 text-white font-bold" : "text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/30"}`}>
      {label}
      {active && <Icon d={ICONS.projects} size={14} />}
    </button>
  )
}