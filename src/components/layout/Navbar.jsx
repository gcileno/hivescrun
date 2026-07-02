import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
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

export function Navbar({ projects = [], organizations = [] }) {

  const navigate = useNavigate()
  const location = useLocation()

  const [projectsOpen, setProjectsOpen] = useState(true)
  const [organizationsOpen, setOrganizationsOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState("")

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

  const isProjectsRoute = location.pathname.startsWith("/home/projects")
  const isOrganizationsRoute = location.pathname.startsWith("/home/organizations")
  const isHomeRoute = location.pathname === "/home"
  const isProjectActive = isProjectsRoute || projectItems.some((project, index) => getProjectLabel(project, index) === selectedProject)
  const isOrganizationActive = isOrganizationsRoute || organizationItems.some((org, index) => getOrganizationLabel(org, index) === selectedProject)

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-900 bg-zinc-950/95 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <HexLogo />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-zinc-100 leading-none">HiveScrum</h1>
            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">Free Edition</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2 lg:justify-center">
          <NavItem icon="profile" label="Profile" active={isHomeRoute} onClick={() => navigate("/home")} compact />

          <DropdownNavItem
            icon="projects"
            label="Projects"
            active={isProjectActive}
            isOpen={projectsOpen}
            onToggle={() => setProjectsOpen((current) => !current)}
            compact
          >
            <DropdownPanel>
              {projectItems.length > 0 ? (
                projectItems.map((project, index) => {
                  const label = getProjectLabel(project, index)
                  const key = typeof project === "object" && project?.id != null ? project.id : `${label}-${index}`

                  return (
                    <SubItem
                      key={key}
                      label={label}
                      active={selectedProject === label}
                      onClick={() => {
                        setSelectedProject(label)
                        navigate("/home/projects")
                        setProjectsOpen(false)
                      }}
                    />
                  )
                })
              ) : (
                <div className="px-3 py-2 text-sm text-zinc-500">Sem projetos</div>
              )}
            </DropdownPanel>
          </DropdownNavItem>

          <DropdownNavItem
            icon="organizations"
            label="Organizations"
            active={isOrganizationActive}
            isOpen={organizationsOpen}
            onToggle={() => setOrganizationsOpen((current) => !current)}
            compact
          >
            <DropdownPanel>
              <SubItem
                label="Abrir organizações"
                active={isOrganizationsRoute}
                onClick={() => {
                  navigate("/home/organizations")
                  setOrganizationsOpen(false)
                }}
              />
              {organizationItems.length > 0 && (
                <div className="mt-2 space-y-1">
                  {organizationItems.slice(0, 5).map((org, index) => {
                    const label = getOrganizationLabel(org, index)
                    const key = typeof org === "object" && org?.id != null ? org.id : `${label}-${index}`

                    return (
                      <SubItem
                        key={key}
                        label={label}
                        active={selectedProject === label}
                        onClick={() => {
                          setSelectedProject(label)
                          navigate("/home/organizations")
                          setOrganizationsOpen(false)
                        }}
                      />
                    )
                  })}
                </div>
              )}
            </DropdownPanel>
          </DropdownNavItem>

          <NavItem icon="sprints" label="Sprints" active={false} onClick={() => {}} compact />
          <NavItem icon="tasks" label="Tasks" active={false} onClick={() => {}} compact />
          <NavItem icon="team" label="Team" active={false} onClick={() => {}} compact />
        </nav>

        <div className="flex items-center gap-3 self-start lg:self-auto">
          <NavItem icon="settings" label="Settings" active={false} onClick={() => {}} compact />
          <button
            type="button"
            className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
            aria-label="Perfil do usuário"
          >
            {location.pathname.startsWith("/home") ? "HS" : ""}
          </button>
        </div>
      </div>
    </header>
  )
}

function NavItem({ icon, label, active, onClick, compact = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-3 rounded-2xl border px-4 py-2.5 text-sm transition-all duration-300 ${
        compact ? 'min-w-max' : 'w-full justify-between'
      } ${active ? 'border-zinc-700 bg-zinc-900 text-zinc-100' : 'border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-700 hover:bg-zinc-900/60 hover:text-zinc-100'}`}
    >
      <div className="flex items-center gap-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={active ? "text-zinc-100" : "text-zinc-600 group-hover:text-zinc-400"}>
          <path d={ICONS[icon]} />
        </svg>
        
        <span className={`tracking-tight ${active ? "font-bold text-zinc-100" : "font-medium"}`}>{label}</span>
      </div>
    </button>
  )
}

function DropdownNavItem({ icon, label, active, isOpen, onToggle, children, compact = false }) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`group inline-flex items-center gap-3 rounded-2xl border px-4 py-2.5 text-sm transition-all duration-300 ${
          compact ? 'min-w-max' : 'w-full justify-between'
        } ${active ? 'border-zinc-700 bg-zinc-900 text-zinc-100' : 'border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-700 hover:bg-zinc-900/60 hover:text-zinc-100'}`}
      >
        <div className="flex items-center gap-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={active ? "text-zinc-100" : "text-zinc-600 group-hover:text-zinc-400"}>
            <path d={ICONS[icon]} />
          </svg>
          <span className={`tracking-tight ${active ? "font-bold text-zinc-100" : "font-medium"}`}>{label}</span>
        </div>

        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform text-zinc-600 group-hover:text-zinc-400 ${isOpen ? "rotate-180" : ""}`}>
          <path d={ICONS.chevron} />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+10px)] z-50 w-72 rounded-2xl border border-zinc-800 bg-zinc-950 p-3 shadow-2xl shadow-black/40">
          {children}
        </div>
      )}
    </div>
  )
}

function DropdownPanel({ children }) {
  return <div className="space-y-2">{children}</div>
}

function SubItem({ label, active, onClick }) {
  return (
    <button type="button" onClick={onClick} className={`w-full rounded-xl px-4 py-2.5 text-left text-sm transition-all flex items-center justify-between ${active ? "bg-zinc-900 text-zinc-100 font-bold" : "text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/30"}`}>
      {label}
      {active && <Icon d={ICONS.projects} size={14} />}
    </button>
  )
}