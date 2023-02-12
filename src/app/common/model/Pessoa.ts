import {Usuario} from "./Usuario";

export enum StatusPessoa {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
    RASCUNHO = 'RASCUNHO'
}

export type FiltroPessoa = {

    nome?: string;
    
}

export type FiltroHistoricoPessoa = {
    usuario?: string;

    tipoOperacao?: TipoOperacao;

    dataInicio?: Date;

    dataTermino?: Date;

    pagina?: number;

    tamanhoPagina?: number;
}

export type Pessoa = {

    id?: number;

    nome: string;

}

export enum TipoOperacao {
    INCLUSAO = 'INCLUSAO',
    ALTERACAO = 'ALTERACAO',
    EXCLUSAO = 'EXCLUSAO'
}

export type HistoricoPessoa = {
    id: number;

    dataOperacao: Date;

    tipoOperacao: TipoOperacao;

    enderecoIp: string;

    usuario: Usuario;

    nome: string;

    descricao: string;

    status?: StatusPessoa;

}