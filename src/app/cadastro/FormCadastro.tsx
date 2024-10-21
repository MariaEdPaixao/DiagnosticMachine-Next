import TituloGeral from "@/components/TituloGeral";
import { BtnForm, ContainerForm, FormVeiculoStyle } from "@/styles/styled";
import { UsuarioType } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormCadastro(){

     const navigate = useRouter()

     const [usuario, setUsuario] = useState<UsuarioType>({
          'email': "",
          'senha':"",
          'nome_completo':"",
          'data_nasc': "",
          'telefone': ""
     })

     const [error, setError] = useState<string | null>(null)

     const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
          const {name, value} = e.target
          setUsuario({...usuario, [name]:value})
     }

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()

          const cabecalho = {
               method: 'POST',
               headers: {"Content-Type" : "application/json"},
               body: JSON.stringify(usuario)
          }

          try{
               const response = await fetch("http://localhost:8080/usuarioresource/cadastroUsuario", cabecalho)
          
               if(response.ok){
                    localStorage.setItem("userEmail", usuario.email);
                    navigate.push('/cadastro/cadastro-veiculo')
               }else{
                    const errorData = await response.json()
                    setError(errorData.message || "Ocorreu um erro")
               }
          
          }catch(error){
               console.error("Erro ao realizar login", error);
               setError("Erro ao conectar com o servidor.");
               alert(usuario.data_nasc +  " | " + usuario.email + " | " + usuario.nome_completo + " | " + usuario.senha + " | " + usuario.telefone)
          }
     }

    return(
        <ContainerForm className="item">
            <TituloGeral conteudo="Cadastre-se" fontSize="45px"/>
            <FormVeiculoStyle onSubmit={handleSubmit}>
            
                <div className="campos">
                     <label htmlFor="idemail">E-mail</label>
                     <input type="text" name="email" id="idemail" placeholder="exemplo@domain.com" className="selectStyle" onChange={handleChangeInput} required/>
                </div>
                <div className="campos">
                     <label htmlFor="idsenha">Senha</label>
                     <input type="password" name="senha" id="idsenha" placeholder="Insira sua senha" className="selectStyle" onChange={handleChangeInput} required/>
                </div>
                <div className="campos">
                     <label htmlFor="idnome">Nome Completo</label>
                     <input type="text" name="nome_completo" id="idnome" placeholder="Insira seu nome completo" className="selectStyle" onChange={handleChangeInput} required/>
                </div>
                <div className="campos">
                     <label htmlFor="idtelefone">Telefone</label>
                     <input type="text" name="telefone" id="idtelefone" placeholder="+5511999999999" className="selectStyle" maxLength={14} onChange={handleChangeInput} required/>
                </div>
                <div className="campos">
                     <label htmlFor="idata">Data de Nascimento</label>
                     <input type="date" name="data_nasc" id="idata" placeholder="+5511999999999" className="selectStyle" onChange={handleChangeInput} required/>
                </div>

               <br />
               {error && <p style={{ color: "red" }}>{error}</p>}
                <BtnForm type="submit" value="Cadastrar"/>
            </FormVeiculoStyle>
        </ContainerForm>
    )
}