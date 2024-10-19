"use client";

import { BtnForm, ContainerForm, FormVeiculoStyle } from "../../styles/styled";
import TituloGeral from "../../components/TituloGeral";
import { AnoCarro } from "./AnoCarro";
import { useState, useEffect } from "react";
import { ModeloMarcaType } from "@/types";

export default function FormCadastroVeiculo() {
    const [modeloMarca, setModeloMarca] = useState<ModeloMarcaType[]>([
        {
            'id': 0, 
            'marca': "", 
            'modelo': ""
        }
    ]); // Inicializa com array vazio

    // Função para buscar os dados da API ao carregar o componente
    useEffect(() => {
        const fetchModelosMarcas = async () => {
            try {
                const response = await fetch("http://localhost:8080/veiculoresource/buscarModelosMarcas");

                if (response.ok) {
                    const dados = await response.json();
                    setModeloMarca(dados); // Atualiza o estado com os dados recebidos
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || "Ocorreu um erro");
                }
            } catch (error) {
                console.error("Erro ao buscar modelos e marcas", error);
            }
        };

        fetchModelosMarcas(); 
    }, []);

    return (
        <ContainerForm className="item">
            <TituloGeral conteudo="Cadastre seu veículo" fontSize="45px" />

            <FormVeiculoStyle action="/login" method="get">
                <div className="campos">
                    <label htmlFor="idcars">Modelo, Marca</label>
                    <select name="modelo_marca" id="idcars" className="selectStyle" required>
                        <option value="" disabled selected>Selecione um conjunto de marca e modelo</option>
                        {modeloMarca.map((mm, index) => (
                            <option value={mm.id} key={index}>
                                {mm.marca}, {mm.modelo} 
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <AnoCarro />
                    <div className="campos">
                        <label htmlFor="idplaca"> Placa </label>
                        <input type="text" name="placa" id="idplaca" placeholder="EX: ABC1D23" className="selectStyle" />
                    </div>
                </div>

                <BtnForm type="submit" value="Cadastrar Veículo" />
            </FormVeiculoStyle>
        </ContainerForm>
    );
}
