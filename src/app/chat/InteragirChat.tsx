import { InteragirChatStyle } from "../../styles/styled";

import BtnEnviar from "./BtnEnviar";

export default function InteragirChat(){
    return(
        <InteragirChatStyle className="envioMensagem">
            <form action="#" method="get">
                <input type="text" name="entrada" id="id-entrada" placeholder="Digite uma mensagem..."/>
                <BtnEnviar/>
            </form>
        </InteragirChatStyle>
    )
}