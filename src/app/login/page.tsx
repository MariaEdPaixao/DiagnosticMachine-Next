"use client"

import FormLogin from "./FormLogin";
import IntrodLogin from "./IntrodLogin";
import { ContainerLogin } from "../../styles/styled";

export default function Login(){
    return(
        <ContainerLogin className="container">
            <IntrodLogin/>

            <FormLogin/>
        </ContainerLogin>
        
    )
}