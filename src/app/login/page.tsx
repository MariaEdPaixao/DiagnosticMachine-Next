"use client"

import FormLogin from "./FormLogin";
import IntrodCarlos from "../../components/IntrodCarlos";
import { ContainerFormIntrod } from "../../styles/styled";
import WithAuthRedirect from "./../../components/WithAuthRedirect";

function Login(){
    return(
        <ContainerFormIntrod className="container">
            <IntrodCarlos fala = "Olá! Bom te ver por aqui,identifique-se para que eu possa te ajudar :)"/>
            <FormLogin/>
        </ContainerFormIntrod>
        
    )
}

export default WithAuthRedirect(Login);