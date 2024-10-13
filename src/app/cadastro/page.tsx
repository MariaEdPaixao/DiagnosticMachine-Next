"use client"

import { ContainerFormIntrod } from "@/styles/styled";
import IntrodCarlos from "../../components/IntrodCarlos";
import FormCadastro from "./FormCadastro";

export default function Cadastro(){
    return(
        <ContainerFormIntrod className="container">
            <IntrodCarlos fala="Vou te guiar nesse processo de cadastramento!!"/>
            <FormCadastro/>
        </ContainerFormIntrod>
        
    )
}

