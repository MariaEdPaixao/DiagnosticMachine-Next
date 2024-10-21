import { PerfilInfosStyle } from "@/styles/styled";
import { UserType } from "@/types";
import { useState } from "react";

export default function InfosUser(){

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try{
            const email = localStorage.getItem("userEmail")
            const response = await fetch(`http://localhost:8080/usuarioresource/exibirUsuario/${email}`)

            if(response.ok){
                const dadosUser = await response.json()
                setUser(dadosUser) 
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Ocorreu um erro");
            }

        }catch(error){
            alert("Erro ao exibir o usuário");
            console.error("Erro ao exibir o usuário", error);
        }
    }

    return(
        <div>
            <PerfilInfosStyle>
                <div className="tituloPerfil">
                    <h2>Olá, <span>fulana(o)</span>. Veja seus dados</h2>
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
                            <input type="text" name="telefone" id="idemail" className="selectStyle" value={user.telefone} onChange={handleChange}/>
                        </div>
                        <div className="campos">
                            <label htmlFor="iddate">Data de Nascimento: </label>
                            <input type="date" name="data_nasc" id="iddate" className="selectStyle" value={user.data_nasc} onChange={handleChange}/>
                        </div>
                    </div>
                    <input type="submit" value="Alterar informações" className="btn"/>
                </form>
    
        </PerfilInfosStyle>
        </div>
    )
}