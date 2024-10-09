import { TituloStyle } from "../styles/styled";
import { TituloProps } from "../types";


export default function TituloGeral({conteudo}:TituloProps){
    return(
        <div className="titulo">
                <TituloStyle>{conteudo}</TituloStyle>
            </div>
    )
}