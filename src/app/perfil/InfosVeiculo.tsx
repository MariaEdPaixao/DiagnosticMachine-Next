import { PerfilInfosStyle } from "@/styles/styled";
import { VeiculoCompletoType } from "@/types";
import { useEffect, useState } from "react";

export default function InfosVeiculo(){

    const [veiculo, setVeiculo] = useState<VeiculoCompletoType>({
        'ano': 0,
        'placa': "",
        'modelo': "",
        'marca': ""
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => { 
        const {name, value} = e.target
        setVeiculo({...veiculo,[name]:value})
    }


    const fetchUserData = async () => {
        try {
            // Verifica se está no lado do cliente antes de acessar sessionStorage
            const idUsuario = typeof window !== "undefined" ? sessionStorage.getItem("idUsuario") : null;
            const parsedIdUsuario = idUsuario ? parseInt(idUsuario, 10) : null;
    
            if (parsedIdUsuario) {
                const response = await fetch(`http://localhost:8080/veiculoresource/exibirVeiculo/${parsedIdUsuario}`);
    
                if (response.ok) {
                    const dadosVeiculo = await response.json();
                    setVeiculo(dadosVeiculo); 
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || "Ocorreu um erro");
                }
            } else {
                alert("ID do usuário não encontrado no sessionStorage.");
            }
    
        } catch (error) {
            alert("Erro ao exibir o veículo");
            console.error("Erro ao exibir o veículo", error);
        }
    };
    

    useEffect(() =>{
        fetchUserData();
    }, [])

    return(
        <PerfilInfosStyle>
            <div className="tituloPerfil">
                <h2>Dados do seu veículo: </h2>
            </div>
            <form>
                <div className="campos">
                    <label htmlFor="idmarca">Marca: </label>
                    <input type="text" name="marca" id="idmarca" className="selectStyle" value={veiculo.marca} readOnly onChange={handleChange}/>
                </div>
                <div className="campos">
                    <label htmlFor="idmodelo">Modelo: </label>
                    <input type="text" name="modelo" id="idmodelo" className="selectStyle" value={veiculo.modelo} readOnly onChange={handleChange}/>
                </div>
                <div className="infosC">
                    <div className="campos">
                        <label htmlFor="idano">Ano: </label>
                        <input type="number" name="ano" id="idano" className="selectStyle" value={veiculo.ano} readOnly onChange={handleChange}/>
                    </div>
                    <div className="campos">
                        <label htmlFor="idplaca">Placa: </label>
                        <input type="text" name="placa" id="idplaca" className="selectStyle" value={veiculo.placa} readOnly onChange={handleChange}/>
                    </div>
                </div>
            </form>
        </PerfilInfosStyle>
    )
}