import { Page } from "../../../common/component/Page";
import './ContatoListar.css';
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useContato } from "./useContato";
import { Contato, HistoricoContato } from "../../../common/model/Contato";
import iconDelete from '../../../../assets/images/delete.png';
import iconDetalhe from '../../../../assets/images/detalhe.png';
import iconEdicao from '../../../../assets/images/edit.png';

export const ContatoListar = () => {
    const {
        toast, formFiltro, onDetalhar, onEditar, onDetalharExclusao, isLoading,
        contatos, pessoas, meiosContato, isFormFieldValid, classNames, onCadastrar, onExportExcel, onExportPdf
    } = useContato();

    const form = formFiltro;

    const getFormErrorMessage = (name: keyof Contato) => {
        return isFormFieldValid(name, form) && <small className="p-error">{form.errors[name]}</small>;
    };

    const opcoes = (e: HistoricoContato) => <>
        <Button className='p-button-icon p-button-text' type={"button"}
            onClick={() => onDetalhar(e.id)}>
            <img className="icon" alt="Visualizar registro" src={iconDetalhe} />
        </Button>
        <Button className='p-button-icon p-button-text' type={"button"}
            onClick={() => onEditar(e.id)}>
            <img className="icon" alt="Alterar o registro" src={iconEdicao} />
        </Button>
        <Button className='p-button-icon p-button-text' type={"button"}
            onClick={() => onDetalharExclusao(e.id)}>
            <img className="icon" alt="Excluir o registro" src={iconDelete} />
        </Button>
    </>;

    return (
        <Page title={'Consultar Contato'} breadCrumb={['Gerenciamento', 'Consultar Contato']} loading={isLoading}>
            <>
                <Toast ref={toast} />

                <Divider />
                <form onSubmit={form.handleSubmit} className='w-100'>
                    <div className='p-fluid p-formgrid p-grid'>

                        <div className='p-field p-col-9'>
                            <label htmlFor='nomeContato'>Pessoa</label>
                            <Dropdown id='pessoa_id' value={form.values.pessoa_id} optionLabel={"nome"} optionValue={"id"} className={classNames({ 'p-invalid': isFormFieldValid('pessoa_id', form) })}
                                    placeholder={'Selecione a pessoa que deseja ver o contato'} onChange={form.handleChange}
                                    options={pessoas} />
                                {getFormErrorMessage('pessoa_id')}
                        </div>

                        <div className='p-field p-col-3'>
                            <label htmlFor='tipo_contato_id'>Tipo do Contato:</label>
                            <Dropdown id='tipo_contato_id' value={form.values.tipo_contato}  placeholder={"Selecione o Tipo"}
                                optionLabel={"tipo"} optionValue={"id"} onChange={form.handleChange}
                                options={meiosContato} />
                        </div>
                    </div>

                    <div className='p-d-flex p-jc-end'>
                        <Button type="button" label="Cadastrar" className="p-ml-3 "
                            color='accent' onClick={() => onCadastrar()} />
                        <Button type="button" label="Limpar" className="p-ml-3  p-button-secondary"
                            onClick={() => form.resetForm()} color='accent' />
                        <Button type="submit" label="Consultar" className="p-ml-3 " />
                    </div>
                </form>

                <Divider />
                {
                    contatos !== null &&
                    <>

                        <div className='p-d-flex p-jc-end'>
                            <Button className='p-button-icon p-button-text'
                                icon='pi pi-file-pdf p-icon-28' type={"button"}
                                onClick={() => onExportPdf()} />
                            <Button className='p-button-icon p-button-text'
                                icon='pi pi-file-excel p-icon-28' type={"button"}
                                onClick={() => onExportExcel()} />
                        </div>
                        <div>
                            <DataTable value={contatos} paginator rows={5} emptyMessage="Nenhum contato encontrado.">
                                <Column field='tipo_contato.tipo' header='Meio de contato' />
                                <Column field='informacao' header='Informação' />
                                <Column body={(e) => opcoes(e)} style={{ textAlign: 'center' }}
                                    header='Opções' headerStyle={{ textAlign: 'center' }} />
                            </DataTable>
                        </div>
                        <p className="p-text-center pt-3 pb-3" >Total de contatos encontrados na pesquisa: {contatos ? contatos.length : 0}</p>

                    </>

                }
            </>
        </Page>
    );
}