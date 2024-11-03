"use client"

import Link from "next/link";
import Image from "next/image";
import { FooterStyle, CopyrightSection } from "@/styles/styled";

//imagens

import instagram from "../assets/img/icones/instagram.png";
import github from "../assets/img/icones/github.png";
import facebook from "../assets/img/icones/facebook.png";
import copyrigth from "../assets/img/icones/copyright.png";

export default function Rodape(){ 
    return(
        <FooterStyle>
            <section id="icons">
            <a href="#"><Image src={instagram} alt="icone do instagram"/></a>
            <a href="https://github.com/MariaEdPaixao/Challenge-2024.git" target="_blank"><Image src={github} alt="icone do github"/></a>
            <a href="#"><Image src={facebook} alt="icone do facebook"/></a>
            </section>
            <section id="abas">
                <ul id="footer">
                    <li id="itens-footer" className="opcoes">
                        <Link href="/ajuda">
                            Ajuda
                        </Link>
                    </li>
                    <li className="opcoes">
                        <Link href="/aprenda">Aprenda + </Link>
                    </li>
                    <li className="opcoes">
                        <Link href="/sobre">Sobre nós </Link>
                    </li>
                    <li className="opcoes">
                        <Link href="/chat"> Chat </Link>
                    </li>
                </ul> 
            </section>
            <CopyrightSection>
                <Image src={copyrigth} alt="icone copyright"/>
                <p>2024 DiagnosticMachine</p>
            </CopyrightSection>
        </FooterStyle>
    )
}