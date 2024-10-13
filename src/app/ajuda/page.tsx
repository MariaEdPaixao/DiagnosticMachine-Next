"use client"

import IntrodCarlos from "./IntrodCarlos2"; // "./ -> para sair do arquivo que estou"
import { ImgAjuda, SubtituloStyle } from "../../styles/styled";
import Image from "next/image";

//imagens
import partesCarro from "../../assets/img/ajuda/partes-do-carro.png";
import principaisPecas from "../../assets/img/ajuda/principais-pecas.png";

export default function Ajuda(){
    return(
        <main>
           <IntrodCarlos conteudo="Algumas dicas para você se informar sobre o seu veículo. E vão te ajudar!"/>

            <SubtituloStyle>Partes do Carro</SubtituloStyle>

            <ImgAjuda>
                <Image src={partesCarro} className="dica" alt="partes do carro"/>
            </ImgAjuda>

            <SubtituloStyle>Principais Peças</SubtituloStyle>

            <ImgAjuda>
                <Image src={principaisPecas} alt="Principais Peças do Carro" className="dica"/>
            </ImgAjuda>
        </main>
    )
}