export type ConteudoProps = {
    id: number;
    imagem: string;
    titulo: string;
    categoria: 'video' | 'jogo' | 'artigo';
    descricao: string;
};

export type TituloProps = {
    conteudo: string;
}

export type IntrodCarlosProps = {
    conteudo: string;
    className?: string;
}

export type SobreProps = {
    id: number;
    rm_turma: string;
    nome: string;
    foto: string;
    github: string;
    linkedin: string;
}

export type DataProps = {
    data: string;
}