import TituloGeral from "@/components/TituloGeral";
import { BtnForm, ContainerForm, FormVeiculoStyle } from "@/styles/styled";

export default function FormCadastro(){
    return(
        <ContainerForm className="item">
            <TituloGeral conteudo="Cadastre-se" fontSize="45px"/>
            <FormVeiculoStyle action="/cadastro/cadastro-veiculo" method="get">
            
                <div className="campos">
                     <label htmlFor="idemail">E-mail</label>
                     <input type="text" name="email" id="idemail" placeholder="exemplo@domain.com" className="selectStyle"/>
                </div>
                <div className="campos">
                     <label htmlFor="idsenha">Senha</label>
                     <input type="password" name="senha" id="idsenha" placeholder="Insira sua senha" className="selectStyle"/>
                </div>
                <div className="campos">
                     <label htmlFor="idnome">Nome Completo</label>
                     <input type="text" name="nome" id="idnome" placeholder="Insira seu nome completo" className="selectStyle"/>
                </div>
                <div className="campos">
                     <label htmlFor="idtelefone">Telefone</label>
                     <input type="text" name="telefone" id="idtelefone" placeholder="+5511999999999" className="selectStyle" maxlength="15"/>
                </div>
                <div className="campos">
                     <label htmlFor="idata">Data de Nascimento</label>
                     <input type="date" name="data" id="idata" placeholder="+5511999999999" className="selectStyle"/>
                </div>
                <BtnForm type="submit" value="Cadastrar"/>
            </FormVeiculoStyle>
        </ContainerForm>
    )
}