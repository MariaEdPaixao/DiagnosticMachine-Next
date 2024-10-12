"use client"

// import Link from "next/link";
import {BtnForm, ContainerForm, FormVeiculoStyle} from "../../styles/styled";
import TituloGeral from "../../components/TituloGeral";
import { AnoCarro } from "./AnoCarro";


export default function FormCadastroVeiculo() {


    return (
    
            <ContainerForm className="item">
                <TituloGeral conteudo="Cadastre seu veículo" fontSize="45px"/>
            
                <FormVeiculoStyle action="/chat" method="get">
                    <div className="campos">
                        <label htmlFor="idcars">Modelo, Marca</label>
                        <select name="modelo_marca" id="idcars" className="selectStyle">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>
                    <div>
                        <AnoCarro/>
                        <div className="campos">
                            <label htmlFor="idplaca"> Placa </label>
                            <input type="text" name="placa" id="idplaca" placeholder="EX: ABC1D23" className="selectStyle"/>
                        </div>
                    </div>

                    <BtnForm type="submit" value="Cadastrar Veículo"/>
                </FormVeiculoStyle>
             
            </ContainerForm>
        
    );
}
