"use client"

import { PerfilBaseStyle, PerfilStyle } from "@/styles/styled";
import { useState } from "react";
import InfosUser from "./InfosUser";

import user from "../../assets/img/user/profile-user.png";
import Image from "next/image";
import InfosVeiculo from "./InfosVeiculo";


export default function Perfil(){

    const [content, setContent] = useState(true);

    return(
        <PerfilStyle>
            <PerfilBaseStyle>
                <div className="tituloPerfil">
                    <h1>Perfil</h1>
                </div>
        
                    <Image src={user} alt="fotoPerfil"></Image>
    
                <input type="file" name="img" id="" accept="image/*"/>
                <input type="submit" value="Mudar foto" />
                <input type="submit" className="btnVeiculo" onClick={ () => { setContent(!content)} } value={content ? 'Ver dados do seu veículo' : 'Ver dados do seu perfil'}/>
            </PerfilBaseStyle>
            
            {
                content ? (<InfosUser/>) : (<InfosVeiculo/>)
            }
            
        </PerfilStyle>
    )
}
