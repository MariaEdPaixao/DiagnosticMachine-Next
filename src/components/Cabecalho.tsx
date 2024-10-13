"use client";

import { HeaderStyle } from "@/styles/styled";
import Link from "next/link";
import { useState } from "react"; 

// Imagens
import Image from "next/image";
import Logo from "../assets/img/icones/logo.png";
import perfil from "../assets/img/icones/user-profile.png";
import close from "../assets/img/icones/mobile/close_white_36dp.svg";
import menu from "../assets/img/icones/mobile/menu_white_36dp.svg";

export default function Cabecalho() {
  // Definir estado para controlar qual ícone exibir
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuShow = () => {
    const menuMobile = document.querySelector(".mobile-menu") as HTMLElement | null;
    if (menuMobile) {
      // Alterna entre abrir e fechar o menu
      if (menuMobile.classList.contains("open")) {
        menuMobile.classList.remove("open");
      } else {
        menuMobile.classList.add("open");
      }
      // Alternar o estado do ícone do menu
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <HeaderStyle>
      <nav className="nav-bar">
        <div className="logo">
          <Image src={Logo} alt="logo da página" height={90} />
        </div>
        <div className="nav-list">
          <ul>
            <li className="nav-item"><Link href="/ajuda" className="nav-link">Ajuda</Link></li>
            <li className="nav-item" id="opA"><Link href="/aprenda" className="nav-link">Aprenda +</Link></li>
            <li className="nav-item" id="opS"><Link href="/sobre" className="nav-link">Sobre nós</Link></li>
            <li className="nav-item"><Link href="/chat" className="nav-link">Chat</Link></li>
          </ul>
        </div>
        <div className="perfil">
          <Link href="/perfil"><p>Perfil</p></Link>
          <Link href="/perfil"><Image src={perfil} alt="perfil" /></Link>
        </div>

        <div className="mobile-menu-icon">
          {/* Alterna o ícone com base no estado isMenuOpen */}
          <button onClick={menuShow}>
            <Image className="icon" src={isMenuOpen ? close : menu} alt="menu hamburguer" />
          </button>
        </div>
      </nav>

      <div className="mobile-menu">
        <div className="perfil">
          <Link href="/perfil"><Image src={perfil} alt="perfil" /></Link>
          <Link href="/perfil"><p>Perfil</p></Link>
        </div>
        <div id="linha"></div>
        <ul>
          <li className="nav-item"><Link href="/ajuda" className="nav-link">Ajuda</Link></li>
          <li className="nav-item"><Link href="/aprenda" className="nav-link">Aprenda +</Link></li>
          <li className="nav-item"><Link href="/sobre" className="nav-link">Sobre nós</Link></li>
          <li className="nav-item"><Link href="/chat" className="nav-link">Chat</Link></li>
        </ul>
      </div>
    </HeaderStyle>
  );
}
