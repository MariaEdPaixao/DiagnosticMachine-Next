"use client"

import { useState } from "react";
import { CategoriaButton, CategoriaContainer, ContainerCard, IntrodStyle} from "../../styles/styled";
import CardConteudo from "./CardConteudo";
import { ConteudoProps } from "../../types";
import TituloGeral from "../../components/TituloGeral";
import Image from "next/image";

//imagens 
import balaoFala from "../../assets/img/imgs/carlos2fala.png";
import post1 from "../../assets/img/conteudos/img-post1.png";
import post2 from "../../assets/img/conteudos/img-post2.png";
import post3 from "../../assets/img/conteudos/img-post3.png";

const conteudos: ConteudoProps[] = [
  { id: 1, titulo: 'Mecânica básica do automóvel', imagem: post1, categoria: 'jogo', descricao: 'Aprenda a consertar carros de forma divertida! Descubra os segredos da mecânica básica enquanto resolve desafios interativos.' },
  { id: 2, titulo: 'Ferramentas e técnicas', imagem: post2, categoria: 'video', descricao: 'Neste vídeo, você vai dominar as principais ferramentas e técnicas automotivas! Vamos explorar como cada ferramenta funciona na prática . Prepare-se para aprender!' },
  { id: 3, titulo: 'Diagnóstico de problemas comuns', imagem: post3, categoria: 'artigo', descricao: 'Identifique e solucione problemas comuns em carros! Teste suas habilidades de diagnóstico e aprenda a resolver falhas de forma prática e rápida.' }
];

export default function Aprenda() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);

  // Filtrar conteúdos com base na categoria selecionada
  const conteudosFiltrados = categoriaSelecionada
    ? conteudos.filter((conteudo) => conteudo.categoria === categoriaSelecionada)
    : conteudos;

    return(
        <main>
            <IntrodStyle>
                <figure id="container">
                    <Image src={balaoFala} alt="balão de fala" id="balaodefala"/>  
                    <figcaption><b>Bem-vindo(a) ao 
                        Aprenda +</b></figcaption>
                        <figcaption id="txt2"><b>O seu carro tá sem problema, e você não precisa de diagnóstico agora?? Continua aqui com a gente pra aprender um pouco mais</b></figcaption>
                </figure>     
            </IntrodStyle>

            <TituloGeral conteudo="Conteúdos"/>

            <CategoriaContainer>
                <CategoriaButton isSelected={categoriaSelecionada === 'categoria1'} onClick={() => setCategoriaSelecionada('jogo')}>Jogos</CategoriaButton>
                <CategoriaButton isSelected={categoriaSelecionada === 'categoria2'} onClick={() => setCategoriaSelecionada('video')}>Vídeos</CategoriaButton>
                <CategoriaButton isSelected={categoriaSelecionada === 'categoria3'} onClick={() => setCategoriaSelecionada('artigo')}>Artigos</CategoriaButton>
                <CategoriaButton isSelected={categoriaSelecionada === 'categoria4'} onClick={() => setCategoriaSelecionada(null)}>Todos</CategoriaButton>
            </CategoriaContainer>

            <ContainerCard>
                {conteudosFiltrados.map((conteudo, indice) => (<CardConteudo key={indice} id={indice} imagem = {conteudo.imagem} categoria = {conteudo.categoria} titulo = {conteudo.titulo} descricao={conteudo.descricao} />))}
            </ContainerCard>

        </main>

    )
}