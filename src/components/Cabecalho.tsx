// import { HeaderStyle } from "../styled";

import Link from "next/link";

export default function Cabecalho(){

    const menuShow = () => {
        const menuMobile = document.querySelector('.mobile-menu') as HTMLElement | null;
        const icon = document.querySelector('.icon') as HTMLImageElement | null;
      
        if (menuMobile && icon) {
          if (menuMobile.classList.contains('open')) {
            menuMobile.classList.remove('open');
            icon.src = "../../public/icones/mobile/menu_white_36dp.svg";
          } else {
            menuMobile.classList.add('open');
            icon.src = "../../public/icones/mobile/close_white_36dp.svg";
          }
        }
      };

    return(
        <header>
            <nav className="nav-bar">
                <div className="logo">
                    <img src="../../public/icones/logo.png" alt="" />
                </div>
                <div className="nav-list">
                <ul>
                    <li className="nav-item"><Link href="/ajuda" className="nav-link">Ajuda</Link></li>
                    <li className="nav-item" id="opA"><Link href="/aprenda+" className="nav-link">Aprenda +</Link></li>
                    <li className="nav-item"  id="opS"><Link href="/sobre" className="nav-link"> Sobre nós</Link></li>
                    <li className="nav-item"><Link href="/chat" className="nav-link"> Chat</Link></li>
                </ul>
                </div>
                <div className="perfil">
                    <Link href="/"><p>Perfil</p></Link>
                    <Link href="/"><img src="../../public/icones/user-profile.png" alt="perfil"/></Link>
                </div>

                <div className="mobile-menu-icon">
                    <button onClick={menuShow}><img className="icon" src="../../public/icones/mobile/menu_white_36dp.svg" alt=""/></button>
                </div>
            </nav>
            <div className="mobile-menu">
                <div className="perfil">
                    <Link href="/"><img src="../../public/icones/user-profile.png" alt="perfil"/></Link>
                    <Link href="/"><p>Perfil</p></Link>
                </div>
                <div id="linha"></div>
                <ul>
                    <li className="nav-item"><Link href="/ajuda" className="nav-link">Ajuda</Link></li>
                    <li className="nav-item"><Link href="/aprenda+" className="nav-link">Aprenda +</Link></li>
                    <li className="nav-item"><Link href="/sobre" className="nav-link"> Sobre nós</Link></li>
                    <li className="nav-item"><Link href="/chat" className="nav-link"> Chat</Link></li>
                </ul>
            </div>
        </header>
    )
}