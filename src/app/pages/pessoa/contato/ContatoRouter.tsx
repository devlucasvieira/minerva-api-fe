import { Router } from "../../../common/model/Router";
import { ContatoListar } from "./ContatoListar";
import { ContatoCadastro } from "./ContatoCadastro";
import { ContatoDetalhe } from "./ContatoDetalhe";
import { ContatoExclusao } from "./ContatoExclusao";

export const ContatoRouter: Router[] = [
    {path: 'contato/lista', component: <ContatoListar/>, authenticated: false},
    {path: 'contato/cadastro', component: <ContatoCadastro/>, authenticated: false},
    {path: 'contato/detalhe/:id', component: <ContatoDetalhe/>, authenticated: false},
    {path: 'contato/exclusao/:id', component: <ContatoExclusao/>, authenticated: false},
    {path: 'contato/edicao/:id', component: <ContatoCadastro/>, authenticated: false},
]