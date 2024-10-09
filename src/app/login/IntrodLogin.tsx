import Image from "next/image";
import { IntrodLoginStyle } from "../../styles/styled";

//imagens
import balaoFala from "../../assets/img/imgs/carlos1fala.png";

export default function IntrodLogin(){
    return(
        <IntrodLoginStyle className="item">
            <figure id="container">
                <Image src={balaoFala} alt="balão de fala" id="balaodefala"/>  
                <figcaption><b>Olá! Bom te ver por aqui,</b>
                        identifique-se para que eu 
                        possa te ajudar :)</figcaption>
            </figure>            
        </IntrodLoginStyle>
    )
}