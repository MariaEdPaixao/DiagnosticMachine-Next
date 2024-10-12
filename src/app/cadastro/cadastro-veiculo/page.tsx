"use client"

import IntrodLogin from "../../../components/IntrodCarlos";
import { ContainerLogin } from "../../../styles/styled";
import FormCadastroVeiculo from "../FormCadastroVeiculo";

export default function Cadastro(){
    return(
        <ContainerLogin className="container">
            <IntrodLogin fala="Para continuarmos, por favor, insira as informações do seu veículo."/>

            <FormCadastroVeiculo/>
        </ContainerLogin>
        
    )
}