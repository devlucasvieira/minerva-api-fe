import { useState } from "react";
import { useAuth } from "../../common/hooks/useAuth";
import { UserContext } from "../../common/context/UserContext";
import { Avatar } from "primereact/avatar";
import { Menu } from "../../common/component/Menu";
import { Button } from "primereact/button";
import logo from "../../../assets/images/v69_2220.png";
import "./App.css";

function App() {
  const { logout } = useAuth();
  const [show, setShow] = useState<boolean>(false);
  const { isAuthenticated, login, initialized, user } = useAuth();

  if (initialized) {
    return <div>loading...</div>;
  }

  if (initialized || !isAuthenticated()) {
    login();

    return <></>;
  } else {
    return (
      <UserContext.Provider value={user}>
        <div className="p-shadow-3 p-mb-2 border-blue">
          <div className="navbar navbar-light  justify-content-between container">
            <div>
              <button
                className="btn p-m-2"
                type="button"
                onClick={() => setShow(true)}
              >
                <span className="navbar-toggler-icon" />
              </button>
              <a className="logo-container navbar-brand p-ml-4" href="/">
                <img alt="logo" src={logo} width={200} className="logo-img" />
              </a>
            </div>
            <div className="profile-info p-d-flex p-jc-between p-ai-center p-m-2">
              <Button
                className="p-button-label p-button-logout"
                icon="pi pi-user"
                label="Sair da Conta"
                onClick={logout}
              ></Button>
            </div>
          </div>
        </div>
        <div
          className="container"
        >
          <Menu showSideBar={show} hideSideBar={() => setShow(false)} />
        </div>
      </UserContext.Provider>
    );
  }
}

export default App;
