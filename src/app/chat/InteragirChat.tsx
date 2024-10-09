import { InteragirChatStyle } from "../../styles/styled";

export default function InteragirChat(){
    return(
        <InteragirChatStyle className="envioMensagem">
            <form action="#" method="get">
                <input type="text" name="entrada" id="id-entrada" placeholder="Digite uma mensagem..."/>
                <input type="submit" value="" id="enviar"/>
            </form>
        </InteragirChatStyle>
    )
}