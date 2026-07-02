import { useEffect, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar"
import HomeIndex from "./HomeIndex"

import api from '../api/client'


export default function Home() {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

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
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar projects={user?.projects ?? []} organizations={user?.organizations ?? []} />

      <main className="mx-auto flex w-full max-w-[1680px] flex-col gap-6 px-6 py-6 lg:px-10">
        <section className="min-h-[calc(100vh-8rem)] rounded-3xl border border-zinc-800 bg-zinc-950/60 px-6 py-6 shadow-xl shadow-black/10 lg:px-8 lg:py-8">
          {location.pathname === "/home" || location.pathname === "/home/" ? (
            <HomeIndex />
          ) : (
            <Outlet context={{ user, loading }} />
          )}
        </section>
      </main>
    </div>
  )
}