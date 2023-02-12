import { Page } from "../../../common/component/Page";
import { useContato } from "./useContato";
import { InputText } from "primereact/inputtext";
import { Contato, StatusContato } from "../../../common/model/Contato";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import './ContatoCadastro.css';
import { InfoIcon } from "../../../common/component/InfoIcon";
import { Dropdown } from "primereact/dropdown";
import { Editor } from 'primereact/editor';

export const ContatoCadastro = () => {

    const { formCadastro, onVoltar, isLoading, isFormFieldValid, classNames, toast, meiosContato, pessoas } = useContato();

    const form = formCadastro;

    const getFormErrorMessage = (name: keyof Contato) => {
        return isFormFieldValid(name, form) && <small className="p-error">{form.errors[name]}</small>;
    };

    console.log(form.values)

    return (
        <Page title={!!form.values.id ? "Alterar Contato" : 'Cadastrar Contato'}
            breadCrumb={['Gerenciamento', !!form.values.id ? "Alterar Contato" : 'Cadastrar Contato']} loading={isLoading}>
            <>
                <Toast ref={toast} />

                <form onSubmit={form.handleSubmit} className='w-100'>
                    <h4>Dados do Contato</h4>
                    <Divider />
                    <div className='p-fluid p-formgrid p-grid'>
                        {/* {!!form.values.pessoa_id ? <></> : <> */}
                            <div className='p-field p-col-5'>
                                <label htmlFor='pessoa_id'
                                    className={classNames({ 'p-error': isFormFieldValid('pessoa_id', form) })}>Pessoa:
                                    <InfoIcon
                                    info="A pessoa a qual o contato será adicionado"
                                    className="informacao-info" /></label>
                                <Dropdown id='pessoa_id' value={form.values.pessoa_id} optionLabel={"nome"} optionValue={"id"} className={classNames({ 'p-invalid': isFormFieldValid('pessoa_id', form) })}
                                    placeholder={'Selecione o meio de contato'} onChange={form.handleChange}
                                    options={pessoas} />
                                {getFormErrorMessage('pessoa_id')}
                            </div>
                        {/* </>} */}
                        <div className='p-field p-col-5'>
                            <label htmlFor='status'
                                className={classNames({ 'p-error': isFormFieldValid('tipo_contato', form) })}>Tipo de Contato:</label>
                            <Dropdown id='tipo_contato' value={form.values.tipo_contato} optionLabel={"tipo"} optionValue={"id"} className={classNames({ 'p-invalid': isFormFieldValid('tipo_contato', form) })}
                                placeholder={'Selecione o meio de contato'} onChange={form.handleChange}
                                options={meiosContato} />
                            {getFormErrorMessage('tipo_contato')}
                        </div>
                        <div className='p-field p-col-7'>
                            <label htmlFor='informacao'
                                className={classNames({ 'p-error': isFormFieldValid('informacao', form) })}>Informação:
                                <InfoIcon
                                    info="Nome do Contato"
                                    className="informacao-info" />
                            </label>
                            <InputText id='informacao' value={form.values.informacao}
                                onChange={form.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('informacao', form) }, 'input-form')} />
                            {getFormErrorMessage('informacao')}
                        </div>
                    </div>
                    <div className='p-d-flex p-jc-end'>
                        <Button type="button" label="Limpar" className="p-ml-3  p-button-secondary"
                            onClick={() => form.resetForm()} color='accent' />
                        <Button type="button" label="Voltar" className="p-ml-3 p-button-secondary"
                            onClick={() => onVoltar()} color='accent' />
                        <Button type="submit" label="Confirmar" className="p-ml-3" />
                    </div>
                </form>
            </>
        </Page>
    );
}
