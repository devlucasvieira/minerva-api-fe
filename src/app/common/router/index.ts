import { Router } from '../model/Router';
import { usuarioRouter } from '../../pages/usuario/usuarioRouter';
import { PessoaRouter } from "../../pages/pessoa/PessoaRouter";
import { ContatoRouter } from '../../pages/pessoa/contato/ContatoRouter';

export const routes: Router[] = [
	...usuarioRouter,
	...PessoaRouter,
	...ContatoRouter
];
