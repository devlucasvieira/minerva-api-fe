import { Router } from "../../common/model/Router";
import { PessoaListar } from "./PessoaListar";
import { PessoaCadastro } from "./PessoaCadastro";
import { PessoaDetalhe } from "./PessoaDetalhe";
import { PessoaExclusao } from "./PessoaExclusao";

export const PessoaRouter: Router[] = [
    {path: 'pessoa/lista', component: <PessoaListar/>, authenticated: false},
    {path: 'pessoa/cadastro', component: <PessoaCadastro/>, authenticated: false},
    {path: 'pessoa/detalhe/:id', component: <PessoaDetalhe/>, authenticated: false},
    {path: 'pessoa/exclusao/:id', component: <PessoaExclusao/>, authenticated: false},
    {path: 'pessoa/edicao/:id', component: <PessoaCadastro/>, authenticated: false},
]