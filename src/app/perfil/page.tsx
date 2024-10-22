"use client"

import { DeleteStyle, LogoutStyle, ModalDeleteStyle, PerfilBaseStyle, PerfilStyle } from "@/styles/styled";
import { useState } from "react";
import InfosUser from "./InfosUser";
import { CgLogOut } from "react-icons/cg";
import { BsFillTrashFill } from "react-icons/bs";

import user from "../../assets/img/user/profile-user.png";
import Image from "next/image";
import InfosVeiculo from "./InfosVeiculo";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";


export default function Perfil(){

    const navigate = useRouter()

    const [modal, setModal] = useState<boolean>(false)

    const [content, setContent] = useState(true);

    const idUsuario = sessionStorage.getItem("idUsuario");
    const parsedIdUsuario = idUsuario ? parseInt(idUsuario, 10) : null;

    const handleLogout = () => {
        sessionStorage.clear()
        navigate.push('/')
    }

    const handleDelete = async (idUser: number | null) => {
        try{
            const response = await fetch(`http://localhost:8080/usuarioresource/deletarUsuario/${idUser}`, {method: 'DELETE'})
        
            if(response.ok){
                sessionStorage.clear()
                navigate.push('/')
            }else{
                const errorData = await response.json();
                alert(errorData.message || "Ocorreu um erro no login.");
            }
        }catch(error){
            alert(error)
        }
    }

    return(
        <div>
            <LogoutStyle>
                <CgLogOut id="icon-logout" title="Sair da conta" onClick={handleLogout}/>
            </LogoutStyle>
            <PerfilStyle>
                <PerfilBaseStyle>
                    <div className="tituloPerfil">
                        <h1>Perfil</h1>
                    </div>

                    <DeleteStyle>
                        <BsFillTrashFill id="icon-delete" title="Excluir a conta" onClick={() => setModal(true)}/>
                    </DeleteStyle>

                        <Image src={user} alt="fotoPerfil"></Image>
        
                    <input type="file" name="img" id="" accept="image/*"/>
                    <input type="submit" value="Mudar foto" />
                    <input type="submit" className="btnVeiculo" onClick={ () => { setContent(!content)} } value={content ? 'Ver dados do seu veículo' : 'Ver dados do seu perfil'}/>
                </PerfilBaseStyle>
                
                {
                    content ? (<InfosUser/>) : (<InfosVeiculo/>)
                }
                
            </PerfilStyle>
            <Modal open={modal} onClose={() => {setModal(false)}}>
                <ModalDeleteStyle>
                    <div className="containerText">
                        <BsFillTrashFill size={56} className="icon-delete"/>
                        <h3 className="title" >Excluir Conta?</h3>
                        <p className="descricao">Você tem certeza que deseja excluir a sua conta?</p>
                    </div>
                    <div className="containerBtns">
                        <button className="btnDelete btn" onClick={()=>handleDelete(parsedIdUsuario)} >Excluir</button>
                        <button className="btnCancelar btn" onClick={()=>setModal(false)}>Cancelar</button>
                    </div>
                </ModalDeleteStyle>
            </Modal>
        </div>
    )
}
