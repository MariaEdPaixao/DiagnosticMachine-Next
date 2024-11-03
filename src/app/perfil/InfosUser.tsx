import Modal from "@/components/Modal";
import { ModalErrorStyle, ModalSuccessStyle, PerfilInfosStyle } from "@/styles/styled";
import { UserType } from "@/types";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { VscError } from "react-icons/vsc";

export default function InfosUser(){

    const [errorData, setErrorData] = useState(""); 

    // Função para formatar a data de "2004-10-25 00:00:00" para "2004-10-25"
    const formatDateToInput = (dateString: string) => {
        return dateString.split(" ")[0]; // Mantém apenas a data (primeira parte da string)
    };

    const primeiro_nome = () => {
        if (user && user.nome_completo) {
            const nome_lista = user.nome_completo.split(" ");
    
            // Verifica se está no lado do cliente antes de usar sessionStorage
            if (typeof window !== "undefined") {
                sessionStorage.setItem("nomeUser", nome_lista[0]);
            }
    
            return nome_lista[0];
        }
        return ""; // Retorna uma string vazia se 'user.nome_completo' não estiver definido
    };
    

    const [open, setOpen] = useState<boolean>(false)
    const [openError, setOpenError] = useState<boolean>(false)

    const [user, setUser] = useState<UserType>({
        nome_completo: "",
        email: "",
        data_nasc: "",
        telefone: ""
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setUser({...user, [name]:value})

    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const cabecalho = {
            method: 'PUT',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(user)
        }
        try{
            const response = await fetch(`http://localhost:8080/usuarioresource/atualizaDados/${user.email}`, cabecalho)
            if(response.ok){
                setOpen(true)
                // alert("Perfil atualizado com sucesso!")
                
            }else{
                const errorDataJson = await response.json();
                setErrorData(errorDataJson.message)
                setOpenError(true)
            }
        }catch(error){
            console.error("Erro ao realizar login", error);
            alert("Erro ao conectar com o servidor.");
        }
    }

    const fetchUserData = async () => {
        try {
            // Verifica se está no lado do cliente antes de acessar sessionStorage
            const email = typeof window !== "undefined" ? sessionStorage.getItem("userEmail") : null;
    
            if (email) {
                const response = await fetch(`http://localhost:8080/usuarioresource/exibirUsuario/${email}`);
    
                if (response.ok) {
                    const dadosUser = await response.json();
    
                    // Verificando se data_nasc precisa ser formatada
                    if (dadosUser.data_nasc) {
                        dadosUser.data_nasc = formatDateToInput(dadosUser.data_nasc);
                    }
    
                    setUser(dadosUser);
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || "Ocorreu um erro");
                }
            } else {
                alert("Email do usuário não encontrado no sessionStorage.");
            }
        } catch (error) {
            alert("Erro ao exibir o usuário");
            console.error("Erro ao exibir o usuário", error);
        }
    };
    

    useEffect(() =>{
        fetchUserData();
    }, [])

    return(
        <div>
            <PerfilInfosStyle>
                <div className="tituloPerfil">
                    <h2>Olá, <span>{primeiro_nome()}</span>. Veja seus dados</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="campos">
                        <label htmlFor="idnome">Nome Completo: </label>
                        <input type="text" name="nome_completo" id="idnome" className="selectStyle" value={user.nome_completo} onChange={handleChange}/>
                    </div>
                    <div className="campos">
                        <label htmlFor="idemail">E-mail: </label>
                        <input type="email" name="email" id="idemail" className="selectStyle" value={user.email} readOnly/>
                    </div>
                    <div className="infosC">
                        <div className="campos">
                            <label htmlFor="idtelefone">Telefone: </label>
                            <input type="text" name="telefone" id="idtelefone" className="selectStyle" value={user.telefone}  maxLength={14} onChange={handleChange}/>
                        </div>
                        <div className="campos">
                            <label htmlFor="iddate">Data de Nascimento: </label>
                            <input type="date" name="data_nasc" id="iddate" className="selectStyle" value={user.data_nasc} onChange={handleChange}/>
                        </div>
                    </div>
                    <input type="submit" value="Alterar informações" className="btn"/>
                </form>
            </PerfilInfosStyle>

            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalSuccessStyle>
                    <div className="containerText">
                        <FaCheckCircle className="icon-success"/>
                        <h3 className="title" >Sucesso!</h3>
                        <p className="descricao">Seus dados foram atualizados.</p>
                    </div>
                    
                    <button className="btnCancelar btn" onClick={()=>setOpen(false)}>OKAY</button>
                 
                </ModalSuccessStyle>
            </Modal>
                <Modal open={openError} onClose={() => setOpenError(false)}>
                    <ModalErrorStyle>
                        <div className="containerText">
                            <VscError  className="icon-error"/>
                            <h3 className="title" >Erro!</h3>
                            <p className="descricao">{errorData}</p>
                        </div>
                        
                        <button className="btnCancelar btn" onClick={()=>{setOpenError(false); window.location.reload();}}>OKAY</button>
                 
                </ModalErrorStyle>
            </Modal>
        </div>
    )
}
