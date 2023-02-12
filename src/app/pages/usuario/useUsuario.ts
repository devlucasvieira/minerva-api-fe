import {useFormik} from "formik";
import {StatUsuario, Usuario} from "../../common/model/Usuario";
import * as Yup from 'yup';
import message from "../../common/message/AppMessage.json";
import {useHttpClient} from "../../common/hooks/useHttpClient";
import {useDate} from "../../common/hooks/useDate";
import {useCallback, useEffect, useRef, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useUtil} from "../../common/hooks/useUtil";
import { confirmDialog } from 'primereact/confirmdialog';

export const useUsuario = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useRef( null );
    const { isFormFieldValid, classNames, showMessage } = useUtil();
    const { httpPost, httpGet, httpPut, httpDelete, isLoading, error } = useHttpClient<Usuario>();
    const { formatDate, convertToDate, FORMAT_YYYY_MM_DD, FORMAT_YYYY_MM_DD_HH_MM_SS } = useDate();
    const [ usuarios, setUsuarios ] = useState<Usuario[]>([]);
    const form = useFormik<Usuario>({
        initialValues: {
            id: '',
            nomeUsuario: '',
            statUsuario: StatUsuario.ATIVO,
            dataHoraUltimoLogin: undefined,
            descEmail: ''
        },
        onSubmit: values => {

            salvarUsuario( values );
        },
        validationSchema: Yup.object().shape({
            nomeUsuario: Yup.string()
                .max( 40, message.MA001 )
                .required( message.MN001 ),
            descEmail: Yup.string()
                .email( message.MN002 )
                .max( 115, message.MA001 )
                .required( message.MN001 )
        }),
        onReset: _ => {

            navigate('/usuario/formulario');
        }
    });
    const { setValues } = form;

    const onSuccess = useCallback( (): void => {
        showMessage( toast, message.MN005, "success" );
    }, [showMessage, toast] );

    const onError = useCallback( (): void => {
        showMessage( toast, message.MN006, "error" );
    }, [ showMessage, toast ] );

    const carregarUsuario = useCallback( () => {
        if ( id ) {
            httpGet(`/usuarios/${id}`)
                .then( (u: any) => {

                    let usuario: any = {};
                    Object.assign( usuario, u );
                    if ( u.dataHoraUltimoLogin ) {
                        usuario.dataHoraUltimoLogin = convertToDate( `${u.dataHoraUltimoLogin}`, FORMAT_YYYY_MM_DD )
                    }

                    setValues( usuario );
                })
                .catch( _ => onError());
        }
    }, [ id, httpGet, onError, convertToDate, FORMAT_YYYY_MM_DD, setValues ] );

    const carregarUsuarios = useCallback( () => {

        httpGet( '/usuarios/' )
            .then( (retorno: any) => {

                setUsuarios(retorno);
            } )
            .catch( e => {
                onError();
                console.error( e );
            } );

    }, [httpGet, setUsuarios, onError] );

    const salvarUsuario = (usuario: Usuario) => {

        let data: any = {};
        Object.assign( data, usuario );
        if ( data && usuario.dataHoraUltimoLogin ) {
            data.dataHoraUltimoLogin = formatDate( usuario.dataHoraUltimoLogin, FORMAT_YYYY_MM_DD_HH_MM_SS );
        }

        const method: Promise<Usuario> = data.id
            ? httpPut( `/usuarios/${data.id}`, data )
            : httpPost('/usuarios/', data);

            method.then( _ => {
                onSuccess();
                carregarUsuarios();
                form.resetForm();
            }).catch( err => {

                showMessage( toast, err.message, 'error' )
            });
    }

    const stats = [
        { value: StatUsuario.ATIVO, label: StatUsuario.ATIVO },
        { value: StatUsuario.INATIVO, label: StatUsuario.INATIVO }
    ];

    const onEditar = ( usuario: Usuario ) => {
        navigate( `/usuario/formulario/${usuario.id}` );
    }

    const onExcluir = ( usuario: Usuario ) => {

        confirmDialog({
            message: `Deseja excluir o usuario ${usuario.nomeUsuario}?`,
            header: 'Excluir',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            accept() {
                httpDelete( `/usuarios/${usuario.id}` )
                    .then( () => {
                        carregarUsuarios();
                        showMessage(toast, message.MN003, 'success');
                    } )
                    .catch( () => showMessage( toast, message.MN004, 'error' ) )
            },
            rejectLabel: 'Não',
        });

    }

    useEffect( () => {

        carregarUsuario();
    }, [carregarUsuario] );

    useEffect( () => {
        carregarUsuarios();
    }, [carregarUsuarios] );

    return { form, stats, isLoading, error, toast, isFormFieldValid, classNames, usuarios, onEditar, onExcluir };
}