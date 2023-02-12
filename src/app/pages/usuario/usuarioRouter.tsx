import React from "react";
import {Router} from "../../common/model/Router";
import {UsuarioCadastro} from "./UsuarioCadastro";
import {UsuarioListar} from "./UsuarioListar";

export const usuarioRouter: Router[] = [
    {path: 'usuario/lista', component: <UsuarioListar/>},
    {path: 'usuario/formulario', component: <UsuarioCadastro/>},
    {path: 'usuario/formulario/:id', component: <UsuarioCadastro/>},
]