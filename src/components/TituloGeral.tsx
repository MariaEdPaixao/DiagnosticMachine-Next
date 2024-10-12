import { TituloStyle } from "../styles/styled";
import { TituloProps } from "../types";


export default function TituloGeral({conteudo, fontSize }:TituloProps){
    return(
        <div className="titulo">
                <TituloStyle fontSize={fontSize}>{conteudo}</TituloStyle>
            </div>
    )
}