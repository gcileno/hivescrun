import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../hook/useAuth'
import { HexLogo } from "../components/ui/HexLogo"
import ProgressBar from "../components/ui/ProgressBar"


// Exemplo de payload para registro:
// {
//   "username": "joao",
//   "email": "joao@email.com",
//   "password": "senha123",
//   "first_name": "João",
//   "last_name": "Silva",
//   "member_name": "João Silva"
// }
export default function Register() {
    const [step, setStep] = useState(0)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { handleRegister } = useAuth();

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (step === 0) {
            setStep(1)
            return
        }

        const payload = {
            username,
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            member_name: `${firstName} ${lastName}`.trim(),
        }

        try {
            await handleRegister(payload);
            navigate("/home");
        } catch (error) {
            console.error(error.response?.data);
            alert("Erro ao criar conta");
        }
    }

    return (
        <div className="relative w-full max-w-sm mx-4 bg-gradient-to-br from-[#1f1830] to-[#16112a] border border-[#423798]/40 rounded-2xl px-8 py-10 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[#F4B315] to-transparent rounded-full" />

            <div className="flex flex-col items-center gap-2 mb-6">
                <HexLogo />
                <h1 className="text-xl font-bold tracking-widest text-[#F4B315] font-serif">HiveScrum</h1>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#D3AF85]/50">Crie sua conta em duas etapas</p>
            </div>

            <div className="mb-5">
                <ProgressBar value={step === 0 ? 50 : 100} />
                <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#D3AF85]/45">
                    <span className={step === 0 ? "text-[#F4B315]" : ""}>Dados pessoais</span>
                    <span className={step === 1 ? "text-[#F4B315]" : ""}>Acesso</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="overflow-hidden">
                    <div
                        className="flex w-[200%] transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${step * 50}%)` }}
                    >
                        <div className="w-1/2 pr-3 flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] uppercase tracking-widest text-[#D3AF85]/70 font-semibold">Nome</label>
                                <input
                                    type="text"
                                    placeholder="Seu nome"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="bg-[#1A141A] border border-[#423798]/40 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#D3AF85]/30 outline-none focus:border-[#F4B315] transition-all duration-200"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] uppercase tracking-widest text-[#D3AF85]/70 font-semibold">Sobrenome</label>
                                <input
                                    type="text"
                                    placeholder="Seu sobrenome"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="bg-[#1A141A] border border-[#423798]/40 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#D3AF85]/30 outline-none focus:border-[#F4B315] transition-all duration-200"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] uppercase tracking-widest text-[#D3AF85]/70 font-semibold">E-mail</label>
                                <input
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-[#1A141A] border border-[#423798]/40 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#D3AF85]/30 outline-none focus:border-[#F4B315] transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="w-1/2 pl-3 flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] uppercase tracking-widest text-[#D3AF85]/70 font-semibold">Nome de usuário</label>
                                <input
                                    type="text"
                                    placeholder="joaosilva"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-[#1A141A] border border-[#423798]/40 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#D3AF85]/30 outline-none focus:border-[#F4B315] transition-all duration-200"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] uppercase tracking-widest text-[#D3AF85]/70 font-semibold">Senha</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-[#1A141A] border border-[#423798]/40 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#D3AF85]/30 outline-none focus:border-[#F4B315] transition-all duration-200"
                                />
                            </div>

                            <div className="rounded-xl border border-dashed border-[#D3AF85]/15 bg-[#1A141A]/60 px-4 py-3 text-xs leading-5 text-[#D3AF85]/55">
                                O payload final envia <span className="text-[#F4B315]">first_name</span>, <span className="text-[#F4B315]">last_name</span>, <span className="text-[#F4B315]">email</span>, <span className="text-[#F4B315]">username</span> e <span className="text-[#F4B315]">password</span>.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {step === 1 ? (
                        <button
                            type="button"
                            onClick={() => setStep(0)}
                            className="flex-1 py-3.5 rounded-xl border border-[#423798]/40 text-[#D3AF85] font-bold text-sm tracking-widest uppercase font-serif hover:border-[#F4B315]/60 hover:text-[#F4B315] transition-all duration-200"
                        >
                            Voltar
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="flex-1 py-3.5 rounded-xl border border-[#423798]/40 text-[#D3AF85] font-bold text-sm tracking-widest uppercase font-serif hover:border-[#F4B315]/60 hover:text-[#F4B315] transition-all duration-200"
                        >
                            Entrar
                        </button>
                    )}

                    <button
                        type="submit"
                        className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#F4B315] to-[#E59312] text-[#1A141A] font-bold text-sm tracking-widest uppercase font-serif shadow-[0_4px_20px_rgba(244,179,21,0.25)] hover:shadow-[0_8px_28px_rgba(244,179,21,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                    >
                        {step === 0 ? "Continuar" : "Criar conta"}
                    </button>
                </div>

                <p className="text-center text-xs text-[#D3AF85]/40 mt-1">
                    Já tem conta?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="text-[#D3AF85] font-semibold hover:text-[#F4B315] transition-colors duration-200"
                    >
                        Acessar login
                    </button>
                </p>
            </form>
        </div>
    )
}

