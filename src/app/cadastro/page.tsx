"use client"

import { ContainerFormIntrod } from "@/styles/styled";
import IntrodCarlos from "../../components/IntrodCarlos";
import FormCadastro from "./FormCadastro";
import WithAuthRedirect from "./../../components/WithAuthRedirect";

function Cadastro(){
    return(
        <ContainerFormIntrod className="container">
            <IntrodCarlos fala="Vou te guiar nesse processo de cadastramento!!"/>
            <FormCadastro/>
        </ContainerFormIntrod>
        
    )
}

export default WithAuthRedirect(Cadastro)