import { CardFeedbackStyle } from "@/styles/styled";

//imagens"
import iconAspas from "../assets/img/home/aspas.png"
import Image from "next/image";
import { CardFeedbackProps } from "@/types";

export default function CardFeedback({nome, comentario}:CardFeedbackProps){
    return(
        <CardFeedbackStyle>
            <Image src={iconAspas} alt="Icone de aspas" className="icon-aspas"/>
            <div className="feedback-conjunto">
            <h2>{nome}</h2>
            <p>{comentario}</p>
            </div>
        </CardFeedbackStyle>
    )
}