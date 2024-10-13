"use client"

import { PerfilBaseStyle, PerfilStyle } from "@/styles/styled";
import InfosUser from "./InfosUser";

import user from "../../assets/img/user/profile-user.png";
import Image from "next/image";

export default function Perfil(){
    return(
        <PerfilStyle>
            <PerfilBaseStyle>
                <div className="tituloPerfil">
                    <h1>Perfil</h1>
                </div>
        
                    <Image src={user} alt="fotoPerfil"></Image>
    
                <input type="file" name="" id="" value="Mudar a foto"/>
                <input type="submit" value="Mudar foto" />
                <input type="submit" value="Ver dados do seu veículo" className="btnVeiculo"/>
            </PerfilBaseStyle>
            
            <InfosUser/>
        </PerfilStyle>
    )
}