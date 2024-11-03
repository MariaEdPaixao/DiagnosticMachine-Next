"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DataAtual from "./DataAtual";
import IdentificacaoChat from "./IdentificacaoChat";
import InteragirChat from "./InteragirChat";
import { ContainerChatStyle, ContainerMensagens, ModalErrorStyle } from "../../styles/styled";
import Image from "next/image";

// imagens
import perfilCarlos from "../../assets/img/chat/Carlos.png";
import perfilUser from "../../assets/img/chat/User.png";
import Modal from "@/components/Modal";

export default function Chat() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar login
    const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal
    const [nome, setNome] = useState(""); // Estado para armazenar o nome do usuário
    const navigate = useRouter();

    useEffect(() => {
        // Verifica se está no lado do cliente antes de acessar o sessionStorage
        if (typeof window !== "undefined") {
            const userEmail = sessionStorage.getItem("userEmail");
            const nomeUser = sessionStorage.getItem("nomeUser");

            if (userEmail) {
                setIsLoggedIn(true); // Usuário logado
                setNome(nomeUser || ""); // Define o nome do usuário, se disponível
            } else {
                setShowModal(true); // Exibe o modal de login obrigatório
            }
        }
    }, []);

    const handleLoginRedirect = () => {
        navigate.push("/login"); // Redireciona para a página de login
    };

    if (showModal) {
        setTimeout(() => {
            navigate.push('/'); // Redireciona após 2 segundos
        }, 2000);
        
        return (
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <ModalErrorStyle>
                    <div className="containerText">
                        <h3 className="title">Erro!</h3>
                        <p className="descricao">Você deve primeiro fazer login.</p>
                    </div>
                    <button className="btnCancelar btn" onClick={handleLoginRedirect}>Fazer Login</button>
                </ModalErrorStyle>
            </Modal>
        );
    }

    if (!isLoggedIn) {
        return null; // Evita renderizar a página até verificar o login
    }

    // Se o usuário estiver logado, renderiza o conteúdo do chat
    return (
        <ContainerChatStyle className="container">
            <IdentificacaoChat />
            <DataAtual />

            <ContainerMensagens className="chat">
                <section className="message bot-message" id="falaChatBot">
                    <Image src={perfilCarlos} alt="perfil do carlos" className="icon" />
                    <p>Bem-vindo(a), <span>{nome}</span><br /> Sou o Carlos, e juntos vamos descobrir o problema com o seu veículo.</p>
                </section>

                <div className="message user-message" id="falaUser">
                    <p>Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sapiente est officia numquam!</p>
                    <Image src={perfilUser} alt="perfil do usuário" className="icon" />
                </div>
            </ContainerMensagens>

            <InteragirChat />
        </ContainerChatStyle>
    );
}
