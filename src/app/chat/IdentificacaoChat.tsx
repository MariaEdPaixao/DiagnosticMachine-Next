import Image from "next/image";
import { IdentificacaoStyle } from "../../styles/styled";

//imagens
import perfilCarlos from "../../assets/img/chat/Carlos.png"

export default function IdentificacaoChat(){
    return(
        <IdentificacaoStyle className="identificacao">
            <div>
                <Image src={perfilCarlos} alt="foto de perfil do Carlos" id="Carlos"/> 
            </div>

            <div className="infos">   
                <h1>CARlos</h1>
                <hr/>
                <p>Te ajudarei com o problema do seu veiculo.</p>
            </div> 
            <div className="linha"></div>
        </IdentificacaoStyle>
    )
}