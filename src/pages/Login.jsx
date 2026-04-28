import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth'

function HexLogo() {
  return (
    <svg width="52" height="52" viewBox="0 0 60 60" fill="none">
      <polygon points="30,3 55,17 55,43 30,57 5,43 5,17" fill="rgba(66,55,152,0.25)" stroke="#F4B315" strokeWidth="1.5" />
      <polygon points="30,12 47,22 47,38 30,48 13,38 13,22" fill="rgba(142,89,21,0.2)" stroke="#E59312" strokeWidth="1" />
      <text x="30" y="36" textAnchor="middle" fontSize="18" fill="#F4B315" fontFamily="serif" fontWeight="bold">HS</text>
    </svg>
  )
}

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { handleLogin } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      alert("Preencha todos os campos")
      return
    }

    try {
      setLoading(true)

      await handleLogin({
        username,
        password,
      })

      navigate("/home")
    } catch (error) {
      console.error(error.response?.data)
      alert("Usuário ou senha inválidos")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="relative w-full max-w-sm bg-gradient-to-br from-[#1f1830] to-[#16112a] border border-[#423798]/40 rounded-2xl px-8 py-10 shadow-2xl">

        {/* Linha topo */}
        <div className="absolute top-0 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[#F4B315] to-transparent rounded-full" />

        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <HexLogo />
          <h1 className="text-xl font-bold tracking-widest text-[#F4B315] font-serif">HiveScrum</h1>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#D3AF85]/50">Gestão ágil de projetos</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-widest text-[#D3AF85]/70 font-semibold">
              Usuário
            </label>
            <input
              type="text"
              placeholder="seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#1A141A] border border-[#423798]/40 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#D3AF85]/30 outline-none focus:border-[#F4B315] transition-all duration-200"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-widest text-[#D3AF85]/70 font-semibold">
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#1A141A] border border-[#423798]/40 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#D3AF85]/30 outline-none focus:border-[#F4B315] transition-all duration-200"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-[11px] text-[#D3AF85]/50 hover:text-[#F4B315] transition-colors duration-200"
            >
              Esqueci a senha
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F4B315] to-[#E59312] text-[#1A141A] font-bold text-sm tracking-widest uppercase font-serif shadow-[0_4px_20px_rgba(244,179,21,0.25)] hover:shadow-[0_8px_28px_rgba(244,179,21,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-center text-xs text-[#D3AF85]/40 mt-1">
            Sem conta?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-[#D3AF85] font-semibold hover:text-[#F4B315] transition-colors duration-200"
            >
              Solicitar acesso
            </button>
          </p>

        </form>
      </div>
    </div>
  )
}