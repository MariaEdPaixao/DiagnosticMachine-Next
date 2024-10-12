"use client"

import DataAtual from "./DataAtual";
import IdentificacaoChat from "./IdentificacaoChat";
import InteragirChat from "./InteragirChat";
import { ContainerChatStyle, ContainerMensagens } from "../../styles/styled";
import Image from "next/image";

//imagens
import perfilCarlos from "../../assets/img/chat/Carlos.png"
import perfilUser from "../../assets/img/chat/User.png"

export default function Chat(){
    return(
        <ContainerChatStyle className="container">
            <IdentificacaoChat/>
            <DataAtual/>

            <ContainerMensagens className="chat">
                <section className="message bot-message" id="falaChatBot">
                    <Image src={perfilCarlos} alt="perfil do carlos" className="icon"/>
                    <p>Bem-vindo(a), Francisco! <br/> Sou o Carlos, e juntos vamos descobrir o problema com o seu veículo.</p>
                </section>

                <div className="message user-message" id="falaUser">
                    <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sapiente est officia numquam!</p>
                    <Image src={perfilUser} alt="perfil do usuário" className="icon"/>
                </div>

            </ContainerMensagens>
   
            <InteragirChat/>
        </ContainerChatStyle >
    )
}