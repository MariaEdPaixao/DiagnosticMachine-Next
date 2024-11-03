"use client"

import CardDevs from "./CardDevs";
import TituloGeral from "../../components/TituloGeral";
import { CardSobreStyle, ContainerDevs, DivLinks, SubtituloStyle} from "../../styles/styled";
import { SobreProps } from "../../types";
import Image from "next/image";

//imagens
import imgFundo from "../../assets/img/fundo-sobre.png";
import larissaImg from "../../assets/img/sobre/part/larissa.png";
import mariaImg from "../../assets/img/sobre/part/maria.png";
import luisImg from "../../assets/img/sobre/part/luis.png";

const devs: SobreProps[] = [
    {id: 1, rm_turma: 'RM 555136 | 1TDSPK', nome: 'Larissa Freitas', foto: larissaImg, github: 'https://github.com/MariaEdPaixao/DiagnosticMachine-Next/commits/main/', linkedin:'#'},
    {id: 2, rm_turma: 'RM 558832 | 1TDSPK', nome: 'Maria Paixão', foto: mariaImg, github: 'https://github.com/MariaEdPaixao', linkedin:'https://linkedin.com/in/maria-eduarda-alves-da-paixão-6267a1303'},
    {id: 3, rm_turma: 'RM 555181 | 1TDSPK', nome: 'Luis Carlos', foto: luisImg, github: 'https://github.com/MariaEdPaixao/DiagnosticMachine-Next/commits/main/', linkedin:'#'},
];


export default function Sobre(){
    return(
        <main>
            <CardSobreStyle>
                <Image src={imgFundo} alt="Fundo azulado" id="fundo-sobre"/>
                <div id="titulo">
                    <TituloGeral conteudo="Sobre nós: "/>
                </div>
                <div id="texto">
                    <p>O DiagnosticMachine foi desenvolvido pensando nas principais dores dos nossos usuários: diagnósticos errados e a perda de tempo com processos ineficazes. Sabemos o quanto é frustrante lidar com diagnósticos imprecisos, que muitas vezes levam a reparos desnecessários e custos inesperados. Por isso, nossa plataforma foca em oferecer uma experiência simplificada e confiável, garantindo que você obtenha informações precisas sobre o estado do seu veículo. Nossa solução utiliza uma abordagem moderna, combinando tecnologia avançada com um atendimento personalizado, para que você tenha confiança em cada diagnóstico realizado. Com isso, buscamos eliminar a incerteza e agilizar o processo, economizando tempo e proporcionando tranquilidade ao cliente.
                        Acreditamos que o seu tempo é valioso, e por isso nosso sistema foi desenhado para ser intuitivo e direto, permitindo que você obtenha orçamentos justos e diagnósticos precisos em poucos cliques. Nossa missão é oferecer uma plataforma onde a eficiência e a precisão trabalham juntas para garantir a sua satisfação.</p>
                </div>
            </CardSobreStyle>

            <SubtituloStyle>Nosso Time: </SubtituloStyle>
            
            <ContainerDevs>
                {devs.map((conteudo, indice) => (<CardDevs key={indice} id={indice} rm_turma = {conteudo.rm_turma} nome = {conteudo.nome} foto = {conteudo.foto} github={conteudo.github} linkedin={conteudo.linkedin} />))}
            </ContainerDevs>

            <DivLinks>
                <h3> Link do repositorio: <a href="https://github.com/MariaEdPaixao/DiagnosticMachine-Next/commits/main/" target="_blank">https://github.com/MariaEdPaixao/DiagnosticMachine-Next/commits/main/</a></h3>
                <h3> Link do prototipo: <a href="https://www.figma.com/design/i8geraGT4p6xdm6tp9Az0V/Prototipo-DiagnosticMachine?node-id=0-1&t=1zAgMrcfDSYGVLtM-1" target="_blank">https://www.figma.com/design/i8geraGT4p6xdm6tp9Az0V/Prototipo-DiagnosticMachine?node-id=0-1&t=1zAgMrcfDSYGVLtM-1</a></h3>
            </DivLinks>
        </main>
    )
}