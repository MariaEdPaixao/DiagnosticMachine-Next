import { DataStyle } from "../../styles/styled";

export default function DataAtual(){
    // Obtém a data atual
    const dataAtual = new Date();
    
    // Formata a data como "dd/mm/yyyy"
    const dia = String(dataAtual.getDate()).padStart(2, '0'); // Padded com zero à esquerda
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mes começa do 0
    const ano = dataAtual.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;
    return(
        <DataStyle className="dataAtual">
            <p>{dataFormatada}</p>
        </DataStyle>
    )
}