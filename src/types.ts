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

export type AnoProps = {
    onChange: (e:React.ChangeEvent<HTMLSelectElement>) => void
}

export type UserType = {
    nome_completo: string;
    email: string;
    data_nasc: string; 
    telefone: string;
}

export type FotoRequestType = {
    foto_perfil: string;
}

export type ModeloMarcaType = {
    idModeloMarca: number;
    marca: string;
    modelo: string;
}

export type VeiculoType = {
    ano: number;
    placa: string;
    id_modelo_marca: number
}

export type UsuarioType = {
    email: string;
    senha:string;
    nome_completo:string;
    data_nasc: string;
    telefone: string;
}

export type LoginType = {
    email: string;
    senha: string;
}

export type VeiculoCompletoType = {
    ano: number;
    placa: string;
    modelo: string;
    marca: string
}

export type ModalProps = {
    open:boolean;
    onClose:()=>void;
    children: React.ReactNode;
}

export type CardFeedbackProps = {
    nome: string;
    comentario: string;
}