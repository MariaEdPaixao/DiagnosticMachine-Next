"use client";

import { HeaderStyle } from "@/styles/styled";
import Link from "next/link";
import { useEffect, useState } from "react"; 

// Imagens
import Image from "next/image";
import Logo from "../assets/img/icones/logo.png";
import perfil from "../assets/img/icones/user-profile.png";
import close from "../assets/img/icones/mobile/close_white_36dp.svg";
import menu from "../assets/img/icones/mobile/menu_white_36dp.svg";

export default function Cabecalho() {
  // Definir estado para controlar qual ícone exibir
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [logado, setLogado] = useState<boolean>(false)

  const [imgURL, setImgURL] = useState<string>("")

  const email = sessionStorage.getItem("userEmail")

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

  const fetchFotoData = async () => {
    try {
        const response = await fetch(`http://localhost:8080/usuarioresource/exibirFoto/${email}`);
        if (response.ok) {
            const dadosFoto = await response.json();
            if (dadosFoto.foto != " ") {
                setImgURL(dadosFoto.foto);
                console.log(dadosFoto.foto)
            }
        } else {
            const errorDados = await response.json();
            alert(errorDados.message || "Ocorreu um erro");
        }
    } catch (error) {
        alert("Erro ao exibir o usuário");
        console.error("Erro ao exibir o usuário", error);
    }
  };

  useEffect(() => {
      if(email){
        setLogado(true)
        fetchFotoData()
      }else{
        setLogado(false)
      }
  }, [])


  return (
    <HeaderStyle>
      <nav className="nav-bar">
        <div className="logo">
          <Link href={'/'}> <Image src={Logo} alt="logo da página" height={90}/> </Link>
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
          {
            logado ? (
              <>
                <Link href="/perfil">
                  <p>Perfil</p>
                </Link>
              </>
            ) : (
              <Link href="/login"><p>Login</p></Link>
            )
          }
          
          {imgURL ? (<Link href="/perfil"><Image src={imgURL} alt="Imagem Perfil" height={200} width={203} layout="intrinsic" className="imgFoto"/></Link> ) : ( <Link href="/perfil"><Image src={perfil} alt="perfil"/></Link> )}
           
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
          {imgURL ? (<Link href="/perfil"><Image src={imgURL} alt="Imagem Perfil" height={200} width={203} layout="intrinsic" className="imgFoto"/></Link> ) : ( <Link href="/perfil"><Image src={perfil} alt="perfil"/></Link> )}
          {
            logado ? (
              <>
                <Link href="/perfil">
                  <p>Perfil</p>
                </Link>
              </>
            ) : (
              <Link href="/login"><p>Login</p></Link>
            )
          }
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
