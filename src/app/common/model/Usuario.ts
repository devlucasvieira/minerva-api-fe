export enum StatUsuario {
    ATIVO = 'ATIVO',
    INATIVO = 'INATIVO'
}

export type Usuario = {

    id?: number | string;
    nomeUsuario?: string;
    descEmail?: string;
    dataHoraUltimoLogin?: Date;
    statUsuario?: StatUsuario;
}