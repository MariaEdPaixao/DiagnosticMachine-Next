import { PerfilInfosStyle } from "@/styles/styled";
import { UserType } from "@/types";
import { useState } from "react";

export default function InfosUser(){
    const [user, setUser] = useState<UserType>({
        nome_completo: "fulano",
        email: "fulano@gmail.com",
        data_nasc: "2005-07-08",
        telefone: "11984485978"
    })

    const handChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setUser({...user, [name]:value})

    }

    return(
        <div>
            <PerfilInfosStyle>
                <div className="tituloPerfil">
                    <h2>Olá, <span>fulana(o)</span>. Veja seus dados</h2>
                </div>

                <form action="">
                    <div className="campos">
                        <label htmlFor="idnome">Nome Completo: </label>
                        <input type="text" name="nome_completo" id="idnome" className="selectStyle" value={user.nome_completo} onChange={handChange}/>
                    </div>
                    <div className="campos">
                        <label htmlFor="idemail">E-mail: </label>
                        <input type="email" name="email" id="idemail" className="selectStyle" value={user.email} readOnly/>
                    </div>
                    <div className="infosC">
                        <div className="campos">
                            <label htmlFor="idtelefone">Telefone: </label>
                            <input type="text" name="telefone" id="idemail" className="selectStyle" value={user.telefone} onChange={handChange}/>
                        </div>
                        <div className="campos">
                            <label htmlFor="iddate">Data de Nascimento: </label>
                            <input type="date" name="data_nasc" id="iddate" className="selectStyle" value={user.data_nasc} onChange={handChange}/>
                        </div>
                    </div>
                    <input type="submit" value="Alterar informações" className="btn"/>
                </form>
    
        </PerfilInfosStyle>
        </div>
    )
}