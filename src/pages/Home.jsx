import { useState } from "react"
import { useEffect } from "react"
import { Navbar } from "../components/layout/Navbar"

import api from '../api/client'


export default function Home() {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState("profile")
  //const { token } = useAuth()

    useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get("api/members/profile/")
        setUser(response.data)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return (
    <div className="flex w-screen h-screen bg-[#1A141A] text-[#D3AF85] overflow-hidden">
      
      {/* 1. Sidebar Fixa */}
      <Navbar active={active} setActive={setActive} projects={user?.projects ?? []} organizations={user?.organizations ?? []} />

      {/* 2. Corpo Principal */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header Superior */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-[#D3AF85]/10 bg-[#D3AF85]/3">
          <div>
            <h1 className="text-lg font-serif font-bold tracking-wide capitalize">
              {active}
            </h1>
            <p className="text-[#D3AF85]/40 text-xs mt-0.5">HiveScrum / {active}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-[#D3AF85]/40 text-xs"></p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#423798]/50 border border-[#F4B315]/40 flex items-center justify-center text-[#F4B315] font-bold">
              {user?.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* 3. Iterar sobre a lista de organizações do ususario logado */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {active === "profile" && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl font-serif">Organizations</h2>
              <p className="text-[#D3AF85]/60 mt-2">Seus projetos aparecerão aqui em breve.</p>
              
              {/* Espaço para os Cards futuramente */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="h-32 border border-dashed border-[#D3AF85]/20 rounded-2xl flex items-center justify-center text-[#D3AF85]/20">
                  Card Placeholder
                </div>
              </div>
            </div>
          )}

          {active === "projects" && (
            <div className="animate-in slide-in-from-bottom-2 duration-400">
              <h2 className="text-2xl font-serif">Meus Projetos</h2>
              {/* Lista de projetos virá aqui */}
            </div>
          )}

          {/* Fallback para outras abas */}
          {!["dashboard", "projects"].includes(active) && (
            <div className="flex items-center justify-center h-full text-[#D3AF85]/20 uppercase tracking-widest">
              Em breve: {active}
            </div>
          )}
        </div>

      </main>
    </div>
  )
}