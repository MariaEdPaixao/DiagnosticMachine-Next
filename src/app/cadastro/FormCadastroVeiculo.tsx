"use client";

import { BtnForm, ContainerForm, FormVeiculoStyle, ModalSuccessStyle } from "../../styles/styled";
import TituloGeral from "../../components/TituloGeral";
import { AnoCarro } from "./AnoCarro";
import { useState, useEffect } from "react";
import { ModeloMarcaType, VeiculoType } from "@/types";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import Modal from "@/components/Modal";

export default function FormCadastroVeiculo() {
    const navigate = useRouter()

    const [open, setOpen] = useState<boolean>(false)

    const [modeloMarca, setModeloMarca] = useState<ModeloMarcaType[]>([
        {
            'idModeloMarca': 0, 
            'marca': "", 
            'modelo': ""
        }
    ]);

    const [veiculo, setVeiculo] = useState<VeiculoType>({
        'ano': 0,
        'placa': "",
        'id_modelo_marca': 0
    })

    const [error, setError] = useState<string | null>(null); // Gerencia o estado do erro

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target //pegando os valores que vêem  
        setVeiculo({...veiculo, [name]:value.toUpperCase()})

    }
    
    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVeiculo({ ...veiculo, [name]: parseInt(value, 10) });
    };
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        // Validação de placa antiga e Mercosul
        const placaRegex = /^[A-Z]{3}\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;
        if (!placaRegex.test(veiculo.placa)) {
            setError("Placa inválida. Por favor, siga o formato: ABC1234 (antigo) ou ABC1D23 (Mercosul)");
            return;
        }

        const cabecalho = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(veiculo)
        }

        try{
            const response = await fetch("http://localhost:8080/veiculoresource/cadastroVeiculo", cabecalho)

            if(response.ok){
                sessionStorage.setItem("veiculoPlaca", veiculo.placa);
                
                const email = sessionStorage.getItem("userEmail")

                const response2 = await fetch(`http://localhost:8080/veiculoresource/buscaIdVeiculo/${veiculo.placa}`);
                const response3 = await fetch(`http://localhost:8080/usuarioresource/buscaIdUsuario/${email}`)

                if (response2.ok && response3.ok){
                    const idVeiculo = await response2.json(); 
                    const idUsuario = await response3.json();

                    const responseAssociar = await fetch(`http://localhost:8080/veiculoresource/associacaoUserVeiculo/${idUsuario}/${idVeiculo}`)

                    if(responseAssociar.ok){
                        sessionStorage.setItem("idVeiculo", idVeiculo);
                        sessionStorage.setItem("idUsuario", idUsuario);
                        
                        setOpen(true)
                        setTimeout(() => {
                            navigate.push('/chat') // Redireciona após 2 segundos
                        }, 2000);
                    }else {
                        console.error("Erro ao associar o usuário e o veiculo", error);
                        setError("Erro ao associar o usuário e o veiculo");
                    }

                } else {
                    console.error("Erro ao buscar o id do veículo", error);
                    setError("Erro ao buscar o id do veículo");
                }
                
            }else{
                const errorData = await response.json();
                setError(errorData.message || "Ocorreu um erro no login.");
            }

        }catch(error){
            console.error("Erro ao realizar login", error);
            setError("Erro ao conectar com o servidor.");
        }
    }

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

            <FormVeiculoStyle action="/login" onSubmit={handleSubmit}>
                <div className="campos">
                    <label htmlFor="idcars">Modelo, Marca</label>
                    <select name="id_modelo_marca" id="idcars" className="selectStyle" required  onChange={handleChangeSelect}>
                        <option value="" disabled selected>Selecione um conjunto de marca e modelo</option>
                        {modeloMarca.map((mm, index) => (
                            <option value={mm.idModeloMarca} key={index}>
                                {mm.marca}, {mm.modelo} 
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <AnoCarro onChange = {handleChangeSelect}/>
                    <div className="campos">
                        <label htmlFor="idplaca"> Placa </label>
                        <input type="text" name="placa" id="idplaca" placeholder="EX: ABC1D23" className="selectStyle" onChange={handleChangeInput}/>
                    </div>
                </div>
                <br />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <BtnForm type="submit" value="Cadastrar Veículo" />
            </FormVeiculoStyle>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalSuccessStyle>
                    <div className="containerText">
                        <FaCheckCircle className="icon-success"/>
                        <h3 className="title" >Sucesso!</h3>
                        <p className="descricao">Veículo cadastrado e associado à sua conta.</p>
                    </div>
                    
                    <button className="btnCancelar btn" onClick={()=>setOpen(false)}>OKAY</button>
                 
                </ModalSuccessStyle>
            </Modal>
        </ContainerForm>
    );
}
