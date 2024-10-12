"use client"

import FormLogin from "./FormLogin";
import IntrodLogin from "../../components/IntrodCarlos";
import { ContainerLogin } from "../../styles/styled";

export default function Login(){
    return(
        <ContainerLogin className="container">
            <IntrodLogin fala = "Olá! Bom te ver por aqui,identifique-se para que eu possa te ajudar :)"/>

            <FormLogin/>
        </ContainerLogin>
        
    )
}