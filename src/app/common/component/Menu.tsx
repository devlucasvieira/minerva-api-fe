import { Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { routes } from "../router";
import { Router } from "../model/Router";
import "./Menu.css";
import { useAuth } from "../hooks/useAuth";
import { Sidebar } from "primereact/sidebar";
import { PanelMenu } from "primereact/panelmenu";
import icone from "../../../assets/images/icone.png";

export interface IMenu {
  showSideBar: boolean;
  hideSideBar: () => void;
}

export const Menu = (props: IMenu) => {

  const { logout, isAuthenticated } = useAuth();

  const redirecionar = (link: any) => {
    window.location.hash = link;
    window.location.reload()
  }

  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-fw pi-th-large",
      command:() => { redirecionar("/") }
    },
    {
      label: "Agenda",
      icon: "pi pi-fw pi-folder",
      items: [
        {
          label: "Cadastrar Pessoa",
          icon: "pi pi-fw pi-plus",
          command:() => { redirecionar("/pessoa/cadastro") }
        },
        {
          label: "Listar",
          icon: "pi pi-fw pi-bars",
          command:() => { redirecionar("/pessoa/lista") }
        }
      ]
    },
    {
      label: "Sair",
      icon: "pi pi-fw pi-calendar-times",
      command: () => logout(),
    },
  ];

  return (
    <HashRouter>
      <Sidebar onHide={props.hideSideBar} visible={props.showSideBar}>
        <div className="p-div-user">
          <img src={icone} alt="Icone - Administrador" style={{border: '5px solid white', borderRadius: '45px'}} />
          <h4 className="p-user-nome">Johan Bragança Gonçalves</h4>
          <p className="p-user-matricula">Matrícula: 20230117</p>
        </div>
        <ul className="list-unstyled fw-normal p-py-3">
          {isAuthenticated() && (
            <PanelMenu model={items} />
          )}
        </ul>
      </Sidebar>
      <Suspense fallback={() => <div>...</div>}>
        <Routes>
          {routes.map((route: Router, index: number) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
      </Suspense>
    </HashRouter>
  );
};
