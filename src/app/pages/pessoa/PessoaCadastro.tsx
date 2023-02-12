import { Page } from "../../common/component/Page";
import { usePessoa } from "./usePessoa";
import { InputText } from "primereact/inputtext";
import { Pessoa } from "../../common/model/Pessoa";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import "./PessoaCadastro.css";
import { InfoIcon } from "../../common/component/InfoIcon";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { useState } from "react";

export const PessoaCadastro = () => {
    const {
        formCadastro,
        onVoltar,
        isLoading,
        isFormFieldValid,
        classNames,
        toast,
    } = usePessoa();

    const form = formCadastro;

    const getFormErrorMessage = (name: keyof Pessoa) => {
        return (
            isFormFieldValid(name, form) && (
                <small className="p-error">{form.errors[name]}</small>
            )
        );
    };

    return (
        <Page
            title={!!form.values.id ? "Alterar Pessoa" : "Cadastrar Pessoa"}
            breadCrumb={[
                "Gerenciamento",
                !!form.values.id ? "Alterar Pessoa" : "Cadastrar Pessoa",
            ]}
            loading={isLoading}
        >
            <>
                <Toast ref={toast} />

                <form onSubmit={form.handleSubmit} className="w-100">
                    <h4>Dados do Pessoa</h4>
                    <Divider />
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-9">
                            <label
                                htmlFor="nome"
                                className={classNames({
                                    "p-error": isFormFieldValid("nome", form),
                                })}
                            >
                                Nome do Pessoa
                                <InfoIcon
                                    info="Informe o nome do contato"
                                    className="sigla-info"
                                />
                            </label>
                            <InputText
                                id="nome"
                                value={form.values.nome}
                                onChange={form.handleChange}
                                className={classNames(
                                    { "p-invalid": isFormFieldValid("nome", form) },
                                    "input-form"
                                )}
                            />
                            {getFormErrorMessage("nome")}
                        </div>
                        {/* <div className='p-field p-col-3'>
                            <label htmlFor='status'
                                className={classNames({ 'p-error': isFormFieldValid('status', form) })}>Status do Pessoa</label>
                            <Dropdown id='status' value={form.values.status} optionLabel={"label"} optionValue={"value"} className={classNames({ 'p-invalid': isFormFieldValid('status', form) })}
                             placeholder={'Selecione o status do Pessoa'} onChange={form.handleChange} 
                                options={[
                                    {
                                        label: 'Ativo',
                                        value: StatusPessoa.ATIVO
                                    },
                                    {
                                        label: 'Inativo',
                                        value: StatusPessoa.INATIVO
                                    },
                                    {
                                        label: 'Rascunho',
                                        value: StatusPessoa.RASCUNHO
                                    }
                                ]} />
                            {getFormErrorMessage('status')}
                        </div>
                        <div className="p-field p-col-12">
                            <label htmlFor='descricao'
                                className={classNames({ 'p-error': isFormFieldValid('descricao', form) })}>Descrição do Pessoa</label>
                            <Editor style={{height:'320px'}} id='descricao' className={classNames({ 'p-invalid': isFormFieldValid('descricao', form) })} value={form.values.descricao} onTextChange={(e) => setTexto(e)} />
                            {getFormErrorMessage('descricao')}
                        </div> */}
                    </div>
                    <div className="p-d-flex p-jc-end">
                        <Button
                            type="button"
                            label="Limpar"
                            className="p-ml-3  p-button-secondary"
                            onClick={() => form.resetForm()}
                            color="accent"
                        />
                        <Button
                            type="button"
                            label="Voltar"
                            className="p-ml-3 p-button-secondary"
                            onClick={() => onVoltar()}
                            color="accent"
                        />
                        <Button type="submit" label="Confirmar" className="p-ml-3" />
                    </div>
                </form>
            </>
        </Page>
    );
};
function uuidv4(): any {
    throw new Error("Function not implemented.");
}
