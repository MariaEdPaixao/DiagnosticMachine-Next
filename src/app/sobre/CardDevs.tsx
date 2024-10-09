import Image from "next/image";
import { CardDevsStyle } from "../../styles/styled";
import { SobreProps } from "../../types";

//imagens
import iconLinkdin from "../../assets/img/icones/icon-linkdin.png"
import iconGitHub from "../../assets/img/icones/icon-git.png"

export default function CardDevs({id, rm_turma, nome, foto, github, linkedin}:SobreProps){
    return(
        <CardDevsStyle key={id}>
            <Image src={foto} alt={`Participante ${nome}`} className="foto"/>
                <div className="container"> 
                    <div className="infos">
                        <h3>{nome}</h3>
                        <p>{rm_turma}</p>
                    </div>
                    <div className="icons">
                        <a href={linkedin} target="_blank"><Image src={iconLinkdin} alt={linkedin} width={33} height={32}/></a>
                        <a href={github} target="_blank"><Image src={iconGitHub} alt={github} width={33} height={32}/></a>
                    </div>
                </div>
        </CardDevsStyle>
    )
}