import React from "react";
import {Page} from "../../common/component/Page";
import {useUsuario} from "./useUsuario";
import {InputText} from "primereact/inputtext";
import {Usuario} from "../../common/model/Usuario";
import {Button} from "primereact/button";
import {Calendar} from "primereact/calendar";
import {Dropdown} from "primereact/dropdown";
import {Toast} from "primereact/toast";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Divider} from "primereact/divider";
import {useDate} from "../../common/hooks/useDate";

export const UsuarioCadastro = () => {
    const { form, stats, isLoading, isFormFieldValid, classNames, toast, usuarios, onEditar, onExcluir } = useUsuario();
    const { formatDate, FORMAT_DD_MM_YYYY, convertToDate, FORMAT_YYYY_MM_DD } = useDate();

    const getFormErrorMessage = (name: keyof Usuario) => {
        return isFormFieldValid(name, form) && <small className="p-error">{form.errors[name]}</small>;
    };

    const colunaAcao = (usuario: Usuario) => {
        return (
            <>
                <Button className='p-button-rounded p-button-text'
                        icon='pi pi-pencil'
                        onClick={() => onEditar(usuario)}/>

                <Button className='p-button-rounded p-button-text p-button-danger'
                        icon='pi pi-times'
                        onClick={() => onExcluir(usuario)}/>
            </>
        );
    }

    const colunaData = (usuario: Usuario) => {
        const dataFormatada = usuario.dataHoraUltimoLogin
            ? formatDate( convertToDate( `${usuario.dataHoraUltimoLogin}`, FORMAT_YYYY_MM_DD), FORMAT_DD_MM_YYYY )
            : '';
        return (<>{dataFormatada}</>);
    }

    return (
        <Page title={'Usuario Cadastro'} loading={isLoading}>
            <>
                <Toast ref={toast}/>

                <form onSubmit={form.handleSubmit} className='w-100'>
                    <div className='p-fluid p-formgrid p-grid'>
                        <div className='p-field p-col-5'>
                            <label htmlFor='nomeUsuario' className={classNames({ 'p-error': isFormFieldValid( 'nomeUsuario', form ) })}>Usuario</label>
                            <InputText id='nomeUsuario' value={form.values.nomeUsuario}
                                onChange={form.handleChange}
                                className={classNames({'p-invalid': isFormFieldValid( 'nomeUsuario', form )} )}/>
                            {getFormErrorMessage('nomeUsuario')}
                        </div>
                        <div className='p-field p-col-7'>
                            <label htmlFor='descEmail' className={classNames({ 'p-error': isFormFieldValid( 'descEmail', form ) })}>Email</label>
                            <InputText id='descEmail' value={form.values.descEmail}
                                       onChange={form.handleChange}
                                       className={classNames({'p-invalid': isFormFieldValid( 'descEmail', form )} )}/>
                            {getFormErrorMessage('descEmail')}
                        </div>

                        <div className='p-field p-col-6'>
                            <label htmlFor='dataHoraUltimoLogin' className={classNames({ 'p-error': isFormFieldValid( 'dataHoraUltimoLogin', form ) })}>Ultimo Login</label>
                            <Calendar id='dataHoraUltimoLogin' value={form.values.dataHoraUltimoLogin}
                                      onChange={form.handleChange}
                                      dateFormat="dd/mm/yy"
                                      className={classNames({'p-invalid': isFormFieldValid( 'dataHoraUltimoLogin', form )} )} showIcon/>
                            {getFormErrorMessage('dataHoraUltimoLogin')}
                        </div>
                        <div className='p-field p-col-6'>
                            <label htmlFor='statUsuario' className={classNames({ 'p-error': isFormFieldValid(  'statUsuario', form ) })}>Situação</label>
                            <Dropdown id='statUsuario' value={form.values.statUsuario}
                                      onChange={form.handleChange}
                                      options={stats}
                                      className={classNames({'p-invalid': isFormFieldValid( 'statUsuario', form )} )}/>
                            {getFormErrorMessage('statUsuario')}
                        </div>
                    </div>

                    <div className='p-d-flex p-jc-end'>
                        <Button type="submit" label="Salvar" className="p-button-raised" />
                        <Button type="button" label="Limpar" className="p-ml-2 p-button-raised p-button-secondary" onClick={() => form.resetForm()} color='accent'/>
                    </div>
                </form>

                <Divider/>
                <div>
                    <h4>Lista de Usuários</h4>
                    <DataTable value={usuarios} paginator rows={5} responsiveLayout='scroll'>
                        <Column field='nomeUsuario' header='Usuario' style={{width: '40%'}}/>
                        <Column field='descEmail' header='Email' style={{width: '40%'}}/>
                        <Column body={colunaData} header='Ultimo Login' style={{width: '10%'}}/>
                        <Column body={colunaAcao} header='Ação' style={{width: '10%'}}/>
                    </DataTable>
                </div>
            </>
        </Page>
    );
}