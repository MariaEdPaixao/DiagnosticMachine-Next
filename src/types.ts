import { StaticImageData } from "next/image";

export type ConteudoProps = {
    id: number;
    imagem: string | StaticImageData;
    titulo: string;
    categoria: 'video' | 'jogo' | 'artigo';
    descricao: string;
};

export type TituloProps = {
    conteudo: string;
    fontSize?: string; 
}

export type TituloStyleProps = {
    fontSize?: string; // Prop opcional para o tamanho da fonte
}


export type IntrodCarlosProps = {
    conteudo: string;
    className?: string;
}

export type SobreProps = {
    id: number;
    rm_turma: string;
    nome: string;
    foto: string | StaticImageData;
    github: string;
    linkedin: string;
}

export type DataProps = {
    data: string;
}

export type UserType = {
    // id_usuario: number;
    nome_completo: string;
    email: string;
    // senha: string;
    data_nasc: string; 
    telefone: string;
}