import Link from "next/link";
import {ContainerForm} from "../../styles/styled";
import TituloGeral from "../../components/TituloGeral";

export default function FormLogin() {
    return (
    
            <ContainerForm className="item">
                <TituloGeral conteudo="Login"/>
            
                <form action="/chat" method="get">
                    <div className="email">
                        <label htmlFor="id-email">Email: </label>
                        <input type="email" name="email" id="id-email" placeholder="Insira seu e-mail" /> <br />
                    </div>
                    <div className="senha">
                        <label htmlFor="id-senha">Senha: </label>
                        <input type="password" name="senha" id="id-senha" placeholder="Insira sua senha" /> <br />
                    </div>
                    <div id="esqsenha">
                        <Link href="#">Esqueceu a senha?</Link>
                    </div>
                    <input type="submit" value="Entrar" id="entrar" />
                </form>
                <div id="cad">
                    <p>Ainda não tem uma conta? 
                        <Link href="#"> Cadastre-se </Link>
                    </p>
                </div>
            </ContainerForm>
        
    );
}
