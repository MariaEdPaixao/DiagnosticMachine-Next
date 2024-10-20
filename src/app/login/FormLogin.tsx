import Link from "next/link";
import { BtnForm, ContainerForm } from "../../styles/styled";
import TituloGeral from "../../components/TituloGeral";
import { useState } from "react";
import { LoginType } from "@/types";

export default function FormLogin() {
    const [login, setLogin] = useState<LoginType>({
        'email': "",
        'senha': ""
    });
    const [error, setError] = useState<string | null>(null); // Gerencia o estado do erro

    const handChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null); // Limpa o erro ao submeter novamente

        const cabecalho = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(login)
        };

        try {
            const response = await fetch("http://localhost:8080/usuarioresource/login", cabecalho);
            
            if (response.ok) {
                // Login bem-sucedido
                // Salvar o email no localStorage
                localStorage.setItem("userEmail", login.email);

                window.location.href = "/chat";
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Ocorreu um erro no login."); // Exibe a mensagem de erro do backend
            }
        } catch (error) {
            console.error("Erro ao realizar login", error);
            setError("Erro ao conectar com o servidor.");
        }
    };

    return (
        <ContainerForm className="item">
            <TituloGeral conteudo="Login" />

            <form onSubmit={handleSubmit}>
                <div className="email">
                    <label htmlFor="id-email">Email: </label>
                    <input
                        type="email"
                        name="email"
                        id="id-email"
                        placeholder="Insira seu e-mail"
                        value={login.email}
                        onChange={handChange} 
                        required
                    />
                    <br />
                </div>
                <div className="senha">
                    <label htmlFor="id-senha">Senha: </label>
                    <input
                        type="password"
                        name="senha"
                        id="id-senha"
                        placeholder="Insira sua senha"
                        value={login.senha}
                        onChange={handChange} 
                        required
                    />
                    <br />
                </div>
                <div id="esqsenha">
                    <Link href="#">Esqueceu a senha?</Link>
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>} {/* Exibe a mensagem de erro, se houver */}
                <BtnForm type="submit" value="Entrar" />
            </form>

            <div id="cad">
                <p>
                    Ainda não tem uma conta? <Link href="/cadastro"> Cadastre-se </Link>
                </p>
            </div>
        </ContainerForm>
    );
}
