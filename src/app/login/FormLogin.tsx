import Link from "next/link";
import { BtnForm, ContainerForm, ModalErrorStyle, ModalSuccessStyle } from "../../styles/styled";
import TituloGeral from "../../components/TituloGeral";
import { useState } from "react";
import { LoginType, VeiculoType } from "@/types";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { FaCheckCircle } from "react-icons/fa";
import { VscError } from "react-icons/vsc";

export default function FormLogin() {

    const navigate = useRouter()

    const [open, setOpen] = useState<boolean>(false)
    const [openError, setOpenError] = useState<boolean>(false)

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
                const response2 = await fetch(`http://localhost:8080/usuarioresource/buscaIdUsuario/${login.email}`)
                if(response2.ok){
                    const idUsuario = await response2.json();

                    const response3 = await fetch(`http://localhost:8080/veiculoresource/exibirVeiculo/${idUsuario}`)
                    if(response3.ok){
                        // Convertendo a resposta para JSON com tipagem e pagando somente a placa
                        const data: VeiculoType = await response3.json();
                        const placa: string = data.placa;

                        const response4 = await fetch(`http://localhost:8080/veiculoresource/buscaIdVeiculo/${placa}`)

                        if(response4.ok){
                            const idVeiculo = await response4.json()
                            sessionStorage.setItem("userEmail", login.email)
                            sessionStorage.setItem("idVeiculo", idVeiculo)
                            sessionStorage.setItem("idUsuario", idUsuario) 

                            setOpen(true)
                            setTimeout(() => {
                                navigate.push('/perfil'); // Redireciona após 2 segundos
                            }, 2000);
                        }
                    }else{
                        sessionStorage.clear()
                        sessionStorage.setItem("userEmail", login.email)
                        setOpenError(true)
                        
                        setTimeout(() => {
                            navigate.push('/cadastro/cadastro-veiculo') // Redireciona após 2 segundos
                        }, 2000);
                    }
                }else{
                    const errorData = await response.json();
                    setError(errorData.message || "Erro ao buscar a placa");
                }
                
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

            {/* POPUPS DE ERROS E SUCESSO */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalSuccessStyle>
                    <div className="containerText">
                        <FaCheckCircle className="icon-success"/>
                        <h3 className="title" >Sucesso!</h3>
                        <p className="descricao">Acesso liberado.</p>
                    </div>
                    
                    <button className="btnCancelar btn" onClick={()=>setOpen(false)}>OKAY</button>
                 
                </ModalSuccessStyle>
            </Modal>
                <Modal open={openError} onClose={() => setOpenError(false)}>
                    <ModalErrorStyle>
                        <div className="containerText">
                            <VscError  className="icon-error"/>
                            <h3 className="title" >Erro!</h3>
                            <p className="descricao">Você deve primeiro cadastrar um veículo.</p>
                        </div>
                        
                        <button className="btnCancelar btn" onClick={()=>setOpenError(false)}>OKAY</button>
                 
                    </ModalErrorStyle>
            </Modal>

        </ContainerForm>
    );
}
