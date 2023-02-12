import { useFormik } from "formik";
import * as Yup from "yup";
import message from "../../../common/message/AppMessage.json";
import { useHttpClient } from "../../../common/hooks/useHttpClient";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUtil } from "../../../common/hooks/useUtil";
import { confirmDialog } from "primereact/confirmdialog";
import { FiltroContato, Contato, StatusContato } from "../../../common/model/Contato";
import { useExport } from "../../../common/hooks/useExport";
import { useString } from "../../../common/hooks/useString";

export const useContato = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useRef(null);
    const { isFormFieldValid, classNames, showMessage } = useUtil();
    const { httpGet, httpDelete, httpPost, httpPut, isLoading, error } = useHttpClient<Contato>();
    const [contatos, setContatos] = useState([] as any)
    const [meiosContato, setMeiosContato] = useState([] as any);
    const [pessoas, setPessoas] = useState([] as any);
    const { exportExcel, exportPdf } = useExport();
    const { containsNormalized, compareNormalized } = useString();
    const filtroAnterior = location.state as any;

    const formFiltro = useFormik<FiltroContato>({
        initialValues: {},
        onSubmit: (values) => {
            consultaContatos(values);
        },
        onReset: (_) => {
            setContatos(undefined);
            navigate("/contato/lista");
        },
    });
    const formCadastro = useFormik<Contato>({
        initialValues: {
            informacao: "",
            pessoa_id: undefined,
            tipo_contato: undefined
        },
        validationSchema: Yup.object().shape({
            informacao: Yup.string().max(150, message.MA001).required(message.MN001)
        }),
        onSubmit: (values) => {
            salvarContato(values);
        },
        onReset: (_) => {
            navigate("/contato/cadastro");
        },
    });

    const { setValues } = formCadastro;

    const onSuccess = useCallback((): void => {
        showMessage(toast, message.MN012, "success");
    }, [showMessage, toast]);

    const onError = useCallback((): void => {
        showMessage(toast, message.MN013, "error");
    }, [showMessage, toast]);

    const carregarContato = useCallback(() => {

        if (id) {
            httpGet(`/contatos/${id}`)
                .then((s: any) => {
                    setValues({ ...s.data || undefined });
                })
                .catch(_ => onError());
        }

    }, [httpGet, id, onError, setValues]);

    const buscarTiposContato = useCallback(() => {
        httpGet(`/tipo-contatos/`)
            .then((retorno: any) => {
                setMeiosContato(retorno.data);
            })
            .catch(e => {
                onError();
            });
    }, [httpGet, onError]);

    const buscarPessoas = useCallback(() => {
        httpGet(`/pessoas/`)
            .then((retorno: any) => {
                setPessoas(retorno.data);
            })
            .catch(e => {
                onError();
            });
    }, [httpGet, onError])

    const mapExportColumns = (s: Contato) => ({
        "Informação": s.informacao,
    });

    const onExportExcel = () => {
        if (contatos) {
            exportExcel(contatos.map(mapExportColumns), "Contatos");
        }
    };

    const onExportPdf = () => {
        if (contatos) {
            exportPdf(contatos.map(mapExportColumns), "Contatos");
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const matchFiltro = (filtro: FiltroContato, s: Contato) => {
        if (!!filtro.informacao && !containsNormalized(s.informacao, filtro.informacao)) {
            return false;
        }

        if(filtro.tipo_contato && filtro.tipo_contato !== s?.tipo_contato?.id) {
            return false;
        }

        if(filtro.pessoa_id && filtro.pessoa_id !== s?.pessoa_id?.id) {
            return false;
        }

        return true;
    };

    const consultaContatos = useCallback(
        (filtro: FiltroContato) => {
            httpGet(`/contatos/`)
                .then((retorno: any) => {
                    setContatos(retorno.data.sort((r1: Contato, r2: Contato) => compareNormalized(r1.informacao, r2.informacao))
                        .filter((s: Contato) => matchFiltro(filtro, s)));
                })
                .catch(e => {
                    onError();
                });
        },
        [compareNormalized, httpGet, matchFiltro, onError]
    );

    const salvarContato = (contato: Contato) => {
        let data: any = {
            'id': contato.id,
            'informacao': contato.informacao,
            'pessoa_id': contato.pessoa_id,
            'tipo_contato_id': contato.tipo_contato
        };
        
        Object.assign(data, contato);

        const method: Promise<Contato> = data.id
            ? httpPut(`/contatos/${data.id}`, data)
            : httpPost("/contatos/", data);

        method.then((_) => {
                onSuccess();
                setTimeout(() => {
                    onVoltar();
                }, 2000);
            })
            .catch((err) => {
                showMessage(toast, err.message, "error");
            });
    };

    const stats = [
        { value: StatusContato.ATIVO, label: StatusContato.ATIVO },
        { value: StatusContato.INATIVO, label: StatusContato.INATIVO },
    ];

    const onVoltar = () => {
        navigate(`/contato/lista`);
    };

    const onCadastrar = () => {
        navigate(`/contato/cadastro`);
    };

    const onEditar = (contato: any) => {
        navigate(`/contato/edicao/${contato}`);
    };

    const onHistorico = (idContato: number) => {
        navigate(`/historico-contato/${idContato}`, {
            state: { filtroContato: formFiltro.values },
        });
    };

    const onDetalhar = (idContato: number) => {
        navigate(`/contato/detalhe/${idContato}`);
    };

    const onDetalharExclusao = (contato: any) => {
        navigate(`/contato/exclusao/${contato}`);
    };

    const onExcluir = (contato: Contato) => {
        confirmDialog({
            message: `A exclusão desse Contato poderá impactar em consultas futuras.\n\nDeseja prosseguir com a exclusão?`,
            header: "Confirmacao de Exclusão",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Confirmar",
            accept() {
                httpDelete(`/contatos/${contato.id}`)
                    .then(() => {
                        onVoltar();
                        showMessage(toast, message.MN003, "success");
                    })
                    .catch(() => showMessage(toast, message.MN004, "error"));
            },
            rejectLabel: "Voltar",
        });
    };

    useEffect(() => {
        carregarContato();
        buscarTiposContato();
        buscarPessoas();
    }, [carregarContato, buscarTiposContato, buscarPessoas]);

    useEffect(() => {
        if (filtroAnterior) {
            formFiltro.setValues(filtroAnterior);
            if (!id) {
                consultaContatos(filtroAnterior);
            }
        }
    }, [consultaContatos, filtroAnterior, formFiltro, id]);

    return {
        formCadastro,
        onCadastrar,
        onVoltar,
        formFiltro,
        stats,
        isLoading,
        error,
        toast,
        consultaContatos,
        isFormFieldValid,
        classNames,
        contatos,
        meiosContato,
        pessoas,
        onEditar,
        onExcluir,
        onHistorico,
        onDetalhar,
        onDetalharExclusao,
        onExportExcel,
        onExportPdf,
    };
};
