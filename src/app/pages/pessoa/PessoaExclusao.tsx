import {Page} from "../../common/component/Page";
import {usePessoa} from "./usePessoa";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";

export const PessoaExclusao = () => {
    const {formCadastro, onVoltar, onExcluir, isLoading, toast} = usePessoa();

    const form = formCadastro;

    return (
        <Page title={'Excluir Pessoa'} breadCrumb={['Gerenciamento', 'Exclusão de Pessoa']} loading={isLoading}>
            <>
                <Toast ref={toast}/>

                <h4>Dados do Pessoa</h4>
                <div className='p-fluid p-formgrid p-grid'>
                    <div className='p-field p-col-12'>
                        <label>Nome do Pessoa</label>
                        {formCadastro.values.nome}
                    </div>
                </div>
                <div className='p-d-flex p-jc-end'>
                    <Button type="button" label="Voltar" className=" p-button-secondary"
                            onClick={() => onVoltar()} color='accent'/>
                    <Button type="button" label="Excluir" color="accent"
                            onClick={() => onExcluir(form.values)} className="p-ml-2 p-button-warn"/>
                </div>
            </>
        </Page>
    );
}
