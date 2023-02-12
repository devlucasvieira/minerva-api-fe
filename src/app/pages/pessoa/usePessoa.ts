import { useFormik } from "formik";
import * as Yup from "yup";
import message from "../../common/message/AppMessage.json";
import { useHttpClient } from "../../common/hooks/useHttpClient";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUtil } from "../../common/hooks/useUtil";
import { confirmDialog } from "primereact/confirmdialog";
import { FiltroPessoa, Pessoa, StatusPessoa } from "../../common/model/Pessoa";
import { useExport } from "../../common/hooks/useExport";
import { useString } from "../../common/hooks/useString";

export const usePessoa = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useRef(null);
    const { isFormFieldValid, classNames, showMessage } = useUtil();
    const { httpGet, httpDelete, httpPost, httpPut, isLoading, error } = useHttpClient<Pessoa>();
    const [pessoas, setPessoas] = useState([] as any);
    const { exportExcel, exportPdf } = useExport();
    const { containsNormalized, compareNormalized } = useString();
    const filtroAnterior = location.state as any;

    const formFiltro = useFormik<FiltroPessoa>({
        initialValues: {},
        onSubmit: (values) => {
            consultaPessoas(values);
        },
        onReset: (_) => {
            setPessoas(undefined);
            navigate("/pessoa/lista");
        },
    });
    const formCadastro = useFormik<Pessoa>({
        initialValues: {
            nome: "",
        },
        validationSchema: Yup.object().shape({
            nome: Yup.string().max(255, message.MA001).required(message.MN001)
        }),
        onSubmit: (values) => {
            salvarPessoa(values);
        },
        onReset: (_) => {
            navigate("/pessoa/cadastro");
        },
    });

    const { setValues } = formCadastro;

    const onSuccess = useCallback((): void => {
        showMessage(toast, message.MN012, "success");
    }, [showMessage, toast]);

    const onError = useCallback((): void => {
        showMessage(toast, message.MN013, "error");
    }, [showMessage, toast]);

    const carregarPessoa = useCallback(() => {
        if (id) {
            httpGet(`/pessoas/${id}`)
                .then((s: any) => {
                    setValues({ ...s.data || undefined });
                    console.log(s)
                })
                .catch(_ => onError());
        }
    }, [id, httpGet, onError, setValues]);

    const mapExportColumns = (s: Pessoa) => ({
        "Nome do Pessoa": s.nome
    });

    const onExportExcel = () => {
        if (pessoas) {
            exportExcel(pessoas.map(mapExportColumns), "Pessoas");
        }
    };

    const onExportPdf = () => {
        if (pessoas) {
            exportPdf(pessoas.map(mapExportColumns), "Pessoas");
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const matchFiltro = (filtro: FiltroPessoa, s: Pessoa) => {
        if (!!filtro.nome && !containsNormalized(s.nome, filtro.nome)) {
            return false;
        }

        return true;
    };

    const consultaPessoas = useCallback(
        (filtro: FiltroPessoa) => {
            httpGet(`/pessoas/`)
                .then((retorno: any) => {
                    setPessoas(retorno.data.sort((r1: Pessoa, r2: Pessoa) => compareNormalized(r1.nome, r2.nome))
                        .filter((s: Pessoa) => matchFiltro(filtro, s)));
                })
                .catch(e => {
                    onError();
                });
        },
        [httpGet, compareNormalized, matchFiltro, onError]
    );

    const salvarPessoa = (pessoa: Pessoa) => {
        let data: any = {};
        Object.assign(data, pessoa);

        const method: Promise<Pessoa> = data.id
            ? httpPut(`/pessoas/${data.id}`, data)
            : httpPost("/pessoas/", data);

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
        { value: StatusPessoa.ATIVO, label: StatusPessoa.ATIVO },
        { value: StatusPessoa.INATIVO, label: StatusPessoa.INATIVO },
    ];

    const onVoltar = () => {
        navigate(`/pessoa/lista`, { state: filtroAnterior });
    };

    const onCadastrar = () => {
        navigate(`/pessoa/cadastro`);
    };

    const onEditar = (pessoa: any) => {
        navigate(`/pessoa/edicao/${pessoa}`);
    };

    const onHistorico = (idPessoa: number) => {
        navigate(`/historico-pessoa/${idPessoa}`, {
            state: { filtroPessoa: formFiltro.values },
        });
    };

    const onListarContato = (idPessoa: number) => {
        navigate(`/contato/lista`);
    };

    const onDetalhar = (idPessoa: number) => {
        navigate(`/pessoa/detalhe/${idPessoa}`);
    };

    const onDetalharExclusao = (pessoa: any) => {
        navigate(`/pessoa/exclusao/${pessoa}`);
    };

    const onExcluir = (pessoa: Pessoa) => {
        confirmDialog({
            message: `A exclusão desse Pessoa poderá impactar em consultas futuras.\n\n Deseja prosseguir com a exclusão?`,
            header: "Confirmacao de Exclusão",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Confirmar",
            accept() {
                httpDelete(`/pessoas/${pessoa.id}`)
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
        carregarPessoa();
    }, [carregarPessoa]);

    useEffect(() => {
        if (filtroAnterior) {
            formFiltro.setValues(filtroAnterior);
            if (!id) {
                consultaPessoas(filtroAnterior);
            }
        }
    }, [consultaPessoas, filtroAnterior, formFiltro, id]);

    return {
        formCadastro,
        onCadastrar,
        onVoltar,
        formFiltro,
        stats,
        isLoading,
        error,
        toast,
        consultaPessoas,
        isFormFieldValid,
        classNames,
        pessoas,
        onEditar,
        onExcluir,
        onHistorico,
        onDetalhar,
        onDetalharExclusao,
        onListarContato,
        onExportExcel,
        onExportPdf,
    };
};

