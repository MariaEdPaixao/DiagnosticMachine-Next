import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BtnForm, ContainerForm, ModalErrorStyle, ModalSuccessStyle } from "../../styles/styled";
import TituloGeral from "../../components/TituloGeral";
import Modal from "@/components/Modal";
import { FaCheckCircle } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import { LoginType, VeiculoType } from "@/types";

export default function FormLogin() {
    const navigate = useRouter();

    const [open, setOpen] = useState<boolean>(false);
    const [openError, setOpenError] = useState<boolean>(false);
    const [login, setLogin] = useState<LoginType>({ email: "", senha: "" });
    const [error, setError] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [idUsuario, setIdUsuario] = useState<string | null>(null);
    const [idVeiculo, setIdVeiculo] = useState<string | null>(null);

    const handChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        const cabecalho = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(login),
        };

        try {
            const response = await fetch("http://localhost:8080/usuarioresource/login", cabecalho);
            if (response.ok) {
                const response2 = await fetch(`http://localhost:8080/usuarioresource/buscaIdUsuario/${login.email}`);
                if (response2.ok) {
                    const idUsuario = await response2.json();
                    const response3 = await fetch(`http://localhost:8080/veiculoresource/exibirVeiculo/${idUsuario}`);
                    
                    if (response3.ok) {
                        const data: VeiculoType = await response3.json();
                        const placa = data.placa;

                        const response4 = await fetch(`http://localhost:8080/veiculoresource/buscaIdVeiculo/${placa}`);
                        if (response4.ok) {
                            const idVeiculo = await response4.json();

                            setUserEmail(login.email);
                            setIdUsuario(idUsuario);
                            setIdVeiculo(idVeiculo);

                            setOpen(true);
                            setTimeout(() => {
                                navigate.push("/perfil");
                            }, 2000);
                        }
                    } else {
                        sessionStorage.clear();
                        setUserEmail(login.email);
                        setOpenError(true);

                        setTimeout(() => {
                            navigate.push("/cadastro/cadastro-veiculo");
                        }, 2000);
                    }
                } else {
                    const errorData = await response.json();
                    setError(errorData.message || "Erro ao buscar a placa");
                }
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Ocorreu um erro no login.");
            }
        } catch (error) {
            console.error("Erro ao realizar login", error);
            setError("Erro ao conectar com o servidor.");
        }
    };

    // Armazena os dados no sessionStorage após receber os valores de ID
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (userEmail) sessionStorage.setItem("userEmail", userEmail);
            if (idUsuario) sessionStorage.setItem("idUsuario", idUsuario);
            if (idVeiculo) sessionStorage.setItem("idVeiculo", idVeiculo);
        }
    }, [userEmail, idUsuario, idVeiculo]);

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

                {error && <p style={{ color: "red" }}>{error}</p>}
                <BtnForm type="submit" value="Entrar" />
            </form>

            <div id="cad">
                <p>
                    Ainda não tem uma conta? <Link href="/cadastro"> Cadastre-se </Link>
                </p>
            </div>

            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalSuccessStyle>
                    <div className="containerText">
                        <FaCheckCircle className="icon-success" />
                        <h3 className="title">Sucesso!</h3>
                        <p className="descricao">Acesso liberado.</p>
                    </div>
                    <button className="btnCancelar btn" onClick={() => setOpen(false)}>OKAY</button>
                </ModalSuccessStyle>
            </Modal>
            <Modal open={openError} onClose={() => setOpenError(false)}>
                <ModalErrorStyle>
                    <div className="containerText">
                        <VscError className="icon-error" />
                        <h3 className="title">Erro!</h3>
                        <p className="descricao">Você deve primeiro cadastrar um veículo.</p>
                    </div>
                    <button className="btnCancelar btn" onClick={() => setOpenError(false)}>OKAY</button>
                </ModalErrorStyle>
            </Modal>
        </ContainerForm>
    );
}
