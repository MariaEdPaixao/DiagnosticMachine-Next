import { IntrodAjudaStyle } from "../../styles/styled";
import { IntrodCarlosProps } from "../../types";
import Image from "next/image";

//imagens
import balaoFala from "../../assets/img/imgs/carlos1fala.png"

export default function IntrodCarlos({className, conteudo}:IntrodCarlosProps){
    return(
        <IntrodAjudaStyle className={className}>
            <figure id="container">
                <Image src={balaoFala} alt="balão de fala" id="balaodefala"/>  
                <h1><figcaption><b>{conteudo}</b></figcaption></h1>
            </figure>       
        </IntrodAjudaStyle>
    )
}