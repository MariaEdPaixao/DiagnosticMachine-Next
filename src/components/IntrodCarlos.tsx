import Image from "next/image";
import { IntrodLoginStyle } from "../styles/styled";

//imagens
import balaoFala from "../assets/img/imgs/carlos1fala.png";

export default function IntrodCarlos({fala}:{fala: string}){
    return(
        <IntrodLoginStyle className="item">
            <figure id="container">
                <Image src={balaoFala} alt="balão de fala" id="balaodefala"/>  
                <figcaption>{fala}</figcaption>
            </figure>            
        </IntrodLoginStyle>
    )
}