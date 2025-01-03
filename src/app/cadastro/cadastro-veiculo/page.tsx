"use client"

import IntrodCarlos from "../../../components/IntrodCarlos";
import { ContainerFormIntrod } from "../../../styles/styled";
import FormCadastroVeiculo from "../FormCadastroVeiculo";
import WithAuthRedirect from "./../../../components/WithAuthRedirect";

function CadastroVeiculo(){
    return(
        <ContainerFormIntrod className="container">
            <IntrodCarlos fala="Para continuarmos, por favor, insira as informações do seu veículo."/>

            
            <FormCadastroVeiculo/>
        </ContainerFormIntrod>
        
    )
}

export default WithAuthRedirect(CadastroVeiculo)