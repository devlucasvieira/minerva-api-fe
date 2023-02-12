import { Page } from "../../common/component/Page";
import './PessoaListar.css';
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { usePessoa } from "./usePessoa";
import { HistoricoPessoa } from "../../common/model/Pessoa";
import iconDelete from '../../../assets/images/delete.png';
import iconDetalhe from '../../../assets/images/detalhe.png';
import iconEdicao from '../../../assets/images/edit.png';
import iconContatos from '../../../assets/images/contatos.png';

export const PessoaListar = () => {
    const {
        toast, formFiltro, onDetalhar, onEditar, onDetalharExclusao, onListarContato, isLoading,
        pessoas, onCadastrar, onExportExcel, onExportPdf
    } = usePessoa();
    const form = formFiltro;

    const opcoes = (e: HistoricoPessoa) => <>
        <Button className='p-button-icon p-button-text' type={"button"}
            onClick={() => onListarContato(e.id)}>
            <img className="icon" alt="Listar Contatos" src={iconContatos} />
        </Button>
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
        <Page title={'Consultar Pessoa'} breadCrumb={['Gerenciamento', 'Consultar Pessoa']} loading={isLoading}>
            <>
                <Toast ref={toast} />

                <Divider />
                <form onSubmit={form.handleSubmit} className='w-100'>
                    <div className='p-fluid p-formgrid p-grid'>

                        <div className='p-field p-col-9'>
                            <label htmlFor='nomePessoa'>Nome do Pessoa</label>
                            <InputText id='nomePessoa' value={form.values.nome}
                                onChange={form.handleChange} />
                        </div>

                        <div className='p-field p-col-3'>
                            <label htmlFor='situacao'>Situação do Pessoa</label>
                            <Dropdown id='situacao' value={form.values}  placeholder={"Selecione a Situação"}
                                optionLabel={"label"} optionValue={"value"} onChange={form.handleChange}
                                options={[
                                    {
                                        label: 'Ativo',
                                        value: 'ativo'
                                    },
                                    {
                                        label: 'Desativado',
                                        value: 'desativado'
                                    }
                                ]} />
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
                    pessoas !== null &&
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
                            <DataTable value={pessoas} paginator rows={5} emptyMessage="Nenhum pessoa encontrado.">
                                <Column field='nome' header='Nome do pessoa' />
                                <Column field='observacao' header='Observação' />
                                <Column body={(e) => opcoes(e)} style={{ textAlign: 'center' }}
                                    header='Opções' headerStyle={{ textAlign: 'center' }} />
                            </DataTable>
                        </div>

                        <p className="p-text-center pt-3 pb-3" >Total de pessoas encontrados na pesquisa: {pessoas ? pessoas.length : 0}</p>
                    </>
                }
            </>
        </Page>
    );
}