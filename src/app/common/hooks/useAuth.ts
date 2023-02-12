import {useKeycloak} from "@react-keycloak/web";
import {useCallback, useEffect, useState} from "react";
import {User} from "../model/User";

const APP_URL = process.env.REACT_APP_URL || '';
const APP_CLIENT_ID = process.env.REACT_APP_CLIENTID || '';

export const useAuth = () => {
    const TOKEN_REFRESH = 300;
    const { keycloak, initialized } = useKeycloak();
    const [ user, setUser ] = useState<User>({} as User);
    const [ roles, setRoles ] = useState<any>();

    useEffect( () => {

        if (initialized) {
            return;
        }

        if ( initialized ) {
            keycloak.onTokenExpired = () => {
                keycloak.updateToken(TOKEN_REFRESH - 30)
                    .then(result => {
                        if (!result) {

                            keycloak.login();
                        } else {

                            setUser(data => ({...data, token: keycloak.token}));
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        keycloak.login();
                    })
            };

            const fetchUserInfo = async () => {
                try {
                    const userProfile = await keycloak.loadUserProfile();
                    setUser({...userProfile, token: keycloak.token});
                }catch( e ){
                }
            }

            if (keycloak.authenticated) {
                fetchUserInfo().then( _ => {
                    const data: any = keycloak.userInfo;
                    setRoles( data );
                } );
            }
        }

    }, [initialized, keycloak] );

    const resetPassword = useCallback( () => {
        const urlEncoded = encodeURIComponent( keycloak.clientId || '' );
        // window.location.href = `${keycloak.authServerUrl}/realms/${keycloak.realm}/login-actions/reset-credentials?client_id=${urlEncoded}&tab_id=oVsldJJIl98`;
    }, [keycloak] );

    const logout = useCallback( () => {
        keycloak.logout();
        setTimeout(() => {
            window.location.href = APP_URL;
        }, 100)
    }, [keycloak] );

    const loginGovBR = useCallback( () => {
        // const params = `?client_id=${APP_CLIENT_ID}&response_type=code&scope=openid&kc_idp_hint=govbr&redirect_uri=${APP_URL}`
        // window.location.href = `${keycloak.authServerUrl}/realms/${keycloak.realm}/protocol/openid-connect/auth${params}`;
    }, [keycloak] );

    const login = useCallback( () => {
        // keycloak.login();
    }, [keycloak] );

    const register = useCallback(() => {
        window.location.href = keycloak.createRegisterUrl();
    }, [keycloak] )

    return {
        initialized,
        user,
        roles,
        isAuthenticated: useCallback( () => true, [keycloak] ),
        token: useCallback( () => keycloak.token, [keycloak] ),
        login,
        logout,
        register,
        resetPassword,
        loginGovBR
    }
}