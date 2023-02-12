import { Pessoa } from "./Pessoa";
import { TipoContato } from "./TipoContato";
import {Usuario} from "./Usuario";

export enum StatusContato {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO',
    RASCUNHO = 'RASCUNHO'
}

export type FiltroContato = {

    id?: number;

    informacao?: string;

    tipo_contato?: number | undefined;

    pessoa_id?: number | undefined;
}

export type FiltroHistoricoContato = {

    usuario?: string;

    tipoOperacao?: TipoOperacao;

    dataInicio?: Date;

    dataTermino?: Date;

    pagina?: number;

    tamanhoPagina?: number;
}

export type Contato = {

    id?: number;

    informacao: string;

    tipo_contato?: TipoContato | undefined;

    pessoa_id?: Pessoa | undefined;
}

export enum TipoOperacao {
    INCLUSAO = 'INCLUSAO',
    ALTERACAO = 'ALTERACAO',
    EXCLUSAO = 'EXCLUSAO'
}

export type HistoricoContato = {
    id: number;

    dataOperacao: Date;

    tipoOperacao: TipoOperacao;

    enderecoIp: string;

    usuario: Usuario;

    nome: string;

    descricao: string;

    status?: StatusContato;

}