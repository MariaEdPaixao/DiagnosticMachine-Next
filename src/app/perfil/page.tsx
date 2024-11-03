"use client";

import { DeleteStyle, LogoutStyle, ModalDeleteStyle, ModalErrorStyle, ModalSuccessStyle, PerfilBaseStyle, PerfilStyle } from "@/styles/styled";
import { useEffect, useState } from "react";
import InfosUser from "./InfosUser";
import { CgLogOut } from "react-icons/cg";
import { BsFillTrashFill } from "react-icons/bs";
import user from "../../assets/img/user/profile-user.png";
import Image from "next/image";
import InfosVeiculo from "./InfosVeiculo";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/firebase";
import { FaCheckCircle } from "react-icons/fa";
import { VscError } from "react-icons/vsc";

export default function Perfil() {
    const [imgURL, setImgURL] = useState<string>("");
    const [modal, setModal] = useState<boolean>(false);
    const [modalSuccess, setModalSuccess] = useState<boolean>(false);
    const [modalError, setModalError] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [content, setContent] = useState(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isProfile, setIsProfile] = useState<boolean>(false);
    const [parsedIdUsuario, setParsedIdUsuario] = useState<number | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const router = useRouter();

    // Carrega dados do sessionStorage somente no cliente
    useEffect(() => {
        const idUsuario = sessionStorage.getItem("idUsuario");
        const email = sessionStorage.getItem("userEmail");

        if (idUsuario) {
            setParsedIdUsuario(parseInt(idUsuario, 10));
        }
        setEmail(email);

        if (email) {
            setIsProfile(true);
            fetchFotoData(email);
        } else {
            setShowModal(true);
        }
    }, []);

    const fetchFotoData = async (email: string) => {
        try {
            const response = await fetch(`http://localhost:8080/usuarioresource/exibirFoto/${email}`);
            if (response.ok) {
                const dadosFoto = await response.json();
                if (dadosFoto.foto !== " ") {
                    setImgURL(dadosFoto.foto);
                }
            } else {
                const errorDados = await response.json();
                alert(errorDados.message || "Ocorreu um erro");
            }
        } catch (error) {
            console.error("Erro ao exibir o usuário", error);
            alert("Erro ao exibir o usuário");
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.reload(); // Recarrega a página após limpar o sessionStorage
        router.push('/');
    };

    const handleDelete = async () => {
        if (!parsedIdUsuario) return;

        try {
            const response = await fetch(`http://localhost:8080/usuarioresource/deletarUsuario/${parsedIdUsuario}`, { method: 'DELETE' });
            if (response.ok) {
                sessionStorage.clear();
                window.location.reload();
                router.push('/');
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Erro ao deletar a conta");
                setModalError(true);
            }
        } catch (error) {
            console.error("Erro ao deletar a conta", error);
            alert("Erro ao deletar a conta");
        }
    };

    const handleLoginRedirect = () => {
        router.push("/login");
    };

    if (showModal) {
        setTimeout(() => {
            router.push('/');
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const fileInput = event.currentTarget.elements.namedItem("fileInput") as HTMLInputElement;
        const file = fileInput?.files?.[0];

        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        const updatePhotoURLInDatabase = async (downloadURL: string) => {
            if (!email) return;

            try {
                const cabecalho = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ imgURL: downloadURL }),
                };

                const response = await fetch(`http://localhost:8080/usuarioresource/atualizaFoto/${email}`, cabecalho);
                if (response.ok) {
                    setModalSuccess(true);
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || "Ocorreu um erro ao atualizar a foto");
                }
            } catch (error) {
                console.error("Erro ao atualizar a foto no banco de dados", error);
                alert("Erro ao atualizar a foto no banco de dados");
            }
        };

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log("Progresso do upload:", progress);
            },
            (error) => {
                console.error("Erro ao fazer upload:", error);
                alert("Erro ao fazer upload: " + error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgURL(downloadURL);
                    updatePhotoURLInDatabase(downloadURL);
                });
            }
        );
    };

    if (!isProfile) {
        return null;
    }

    return (
        <div>
            <LogoutStyle>
                <CgLogOut id="icon-logout" title="Sair da conta" onClick={handleLogout} />
            </LogoutStyle>
            <PerfilStyle>
                <PerfilBaseStyle>
                    <div className="tituloPerfil">
                        <h1>Perfil</h1>
                    </div>
                    <DeleteStyle>
                        <BsFillTrashFill id="icon-delete" title="Excluir a conta" onClick={() => setModal(true)} />
                    </DeleteStyle>
                    {imgURL ? (
                        <Image src={imgURL} alt="Imagem" height={200} width={203} layout="intrinsic" />
                    ) : (
                        <Image src={user} alt="fotoPerfil" />
                    )}
                    <form onSubmit={handleSubmit}>
                        <input type="file" name="fileInput" accept="image/*" />
                        <input type="submit" value="Mudar foto" />
                        <input type="submit" className="btnVeiculo" onClick={() => setContent(!content)} value={content ? 'Ver dados do seu veículo' : 'Ver dados do seu perfil'} />
                    </form>
                </PerfilBaseStyle>
                {content ? <InfosUser /> : <InfosVeiculo />}
            </PerfilStyle>
            <Modal open={modal} onClose={() => setModal(false)}>
                <ModalDeleteStyle>
                    <div className="containerText">
                        <BsFillTrashFill size={56} className="icon-delete" />
                        <h3 className="title">Excluir Conta?</h3>
                        <p className="descricao">Você tem certeza que deseja excluir a sua conta?</p>
                    </div>
                    <div className="containerBtns">
                        <button className="btnDelete btn" onClick={handleDelete}>Excluir</button>
                        <button className="btnCancelar btn" onClick={() => setModal(false)}>Cancelar</button>
                    </div>
                </ModalDeleteStyle>
            </Modal>
            <Modal open={modalSuccess} onClose={() => setModalSuccess(false)}>
                <ModalSuccessStyle>
                    <div className="containerText">
                        <FaCheckCircle className="icon-success" />
                        <h3 className="title">Sucesso!</h3>
                        <p className="descricao">Foto atualizada com sucesso!</p>
                    </div>
                    <button className="btnCancelar btn" onClick={() => { setModalSuccess(false); window.location.reload(); }}>OKAY</button>
                </ModalSuccessStyle>
            </Modal>
            <Modal open={modalError} onClose={() => setModalError(false)}>
                <ModalErrorStyle>
                    <div className="containerText">
                        <VscError className="icon-error" />
                        <h3 className="title">Erro!</h3>
                        <p className="descricao">{error}</p>
                    </div>
                    <button className="btnCancelar btn" onClick={() => setModalError(false)}>Fechar</button>
                </ModalErrorStyle>
            </Modal>
        </div>
    );
}
