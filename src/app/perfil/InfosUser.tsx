import { BtnForm, PerfilInfosStyle } from "@/styles/styled";

export default function InfosUser(){
    return(
        <div>
            <PerfilInfosStyle>
                <div className="tituloPerfil">
                    <h2>Olá, <span>fulana(o)</span>. Veja seus dados</h2>
                </div>

                <form action="">
                    <div className="campos">
                        <label htmlFor="idnome">Nome Completo: </label>
                        <input type="text" name="nome" id="idnome" className="selectStyle" value="fulano"/>
                    </div>
                    <div className="campos">
                        <label htmlFor="idemail">E-mail: </label>
                        <input type="email" name="email" id="idemail" className="selectStyle" value="fulano@gmail.com"/>
                    </div>
                    <div className="infosC">
                        <div className="campos">
                            <label htmlFor="idtelefone">Telefone: </label>
                            <input type="email" name="email" id="idemail" className="selectStyle" value="11984485978"/>
                        </div>
                        <div className="campos">
                            <label htmlFor="iddate">Data de Nascimento: </label>
                            <input type="date" name="data" id="iddate" className="selectStyle" value="2005-07-08"/>
                        </div>
                    </div>
                    <BtnForm type="submit" value="Alterar informações" className="selectStyle"/>
                </form>
    
        </PerfilInfosStyle>
        </div>
    )
}