import Keycloak, {KeycloakConfig} from "keycloak-js";

const keycloackConfig: KeycloakConfig = {
    url: process.env.REACT_APP_AUTH_URL,
    realm: process.env.REACT_APP_REALM,
    clientId: process.env.REACT_APP_CLIENTID,
    publicClient: process.env.REACT_APP_PUBLIC_CLIENT,
    sslRequired: process.env.REACT_APP_SSL_REQUIRED,
    confidentialPort: process.env.REACT_APP_CONFIDENTIAL_PORT
} as KeycloakConfig;

export const initOptions = {onload: 'login-required'}

export const keycloak = Keycloak( keycloackConfig );