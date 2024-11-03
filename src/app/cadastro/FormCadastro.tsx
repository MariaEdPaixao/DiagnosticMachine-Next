import Modal from "@/components/Modal";
import TituloGeral from "@/components/TituloGeral";
import { BtnForm, ContainerForm, FormVeiculoStyle, ModalSuccessStyle } from "@/styles/styled";
import { UsuarioType } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";


export default function FormCadastro(){

     const navigate = useRouter()

     const [open, setOpen] = useState<boolean>(false)

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
          
          // Validação do telefone
          const telefoneValido = /^[0-9]{11}$/.test(usuario.telefone);
          if (!telefoneValido) {
               setError("O telefone deve conter exatamente 11 dígitos.");
               return; // Interrompe o envio se o telefone for inválido
          }

          const cabecalho = {
               method: 'POST',
               headers: {"Content-Type" : "application/json"},
               body: JSON.stringify(usuario)
          }

          try{
               const response = await fetch("http://localhost:8080/usuarioresource/cadastroUsuario", cabecalho)
          
               if(response.ok){
                    sessionStorage.setItem("userEmail", usuario.email);
                    
                    setOpen(true)
                    setTimeout(() => {
                         navigate.push('/cadastro/cadastro-veiculo') // Redireciona após 2 segundos
                     }, 2000);
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
                     <input type="text" name="telefone" id="idtelefone" placeholder="11999999999" className="selectStyle" maxLength={11} onChange={handleChangeInput} required/>
                </div>
                <div className="campos">
                     <label htmlFor="idata">Data de Nascimento</label>
                     <input type="date" name="data_nasc" id="idata" className="selectStyle" onChange={handleChangeInput} required/>
                </div>

               <br />
               {error && <p style={{ color: "red" }}>{error}</p>}
                <BtnForm type="submit" value="Cadastrar"/>
            </FormVeiculoStyle>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalSuccessStyle>
                    <div className="containerText">
                        <FaCheckCircle className="icon-success"/>
                        <h3 className="title" >Sucesso!</h3>
                        <p className="descricao">Cadastro realizado.</p>
                    </div>
                    
                    <button className="btnCancelar btn" onClick={()=>setOpen(false)}>OKAY</button>
                </ModalSuccessStyle>
            </Modal>
        </ContainerForm>
    )
}