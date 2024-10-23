"use client"
import Image from "next/image";
import { HomeMain } from "@/styles/styled";
import TituloGeral from "@/components/TituloGeral";

// Imagens
import imgHome from "../assets/img/home/imgHome.jpg";
import iconAprenda from "../assets/img/home/icon-aprenda.png";
import iconAjuda from "../assets/img/home/icon-ajuda.png";
import iconChat from "../assets/img/home/icon-chat.png";
import CardFeedback from "@/components/CardFeedback";
import { CardFeedbackProps } from "@/types";

const feedbacks: CardFeedbackProps[] = [
  {nome: "Juliana", comentario: "Eu ameii a comunicação. O Carlos é super empático, parece que estou falando com um mecânico mesmo."},
  {nome: "Francisco Alves", comentario: "Ótimo me ajudou a resolver o problema do meu veículo quando eu mais precisei."},
  {nome: "Luis Carlos Silva", comentario: "Muito bom, além de me ajudar com meu veículo, tive a oportunidade de aprender muito sobre os veículos no proprio site."}
];


export default function Home() {

  return (
    <HomeMain>
        <Image src={imgHome} alt="imagem home" />
        <TituloGeral conteudo="Nossos serviços" fontSize="45px"/>
        <div className="descricao">
          <p>Nós temos serviços que irão automatizar processos que podem te causar dores de cabeça como o processo de diagnosticar o problema do seu veículo, além de te proporcionar uma experiência humanizada e educativa.</p>
        </div>

        <div className="services">
            <div className="services-descricao">
                <Image src={iconAprenda} alt="serviço de aprenda+" className="icons"/> 
                <p>Conteúdos educativos que desmistificam o diagnóstico.</p>
            </div>
            <div className="services-descricao">
                <Image src={iconChat} alt="serviço de aprenda+" className="icons"/>
                <p>Chatbot que tira dúvidas e fornece diagnóstico e orçamento do seu veículo.</p> 
            </div>
            <div className="services-descricao">
                <Image src={iconAjuda} alt="serviço de aprenda+" className="icons"/> 
                <p>Ajuda a esclarecer suas dúvidas e informações sobre veículos.</p>
            </div>
        </div>

        <TituloGeral conteudo="Feedbacks: " fontSize="45px"/>

        <div className="feedbacks">
            {
              feedbacks.map((f, i) => (<CardFeedback key={i} nome={f.nome} comentario={f.comentario}/>))
            }
        </div>
    </HomeMain>
  );
}
