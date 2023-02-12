import {Page} from "../../common/component/Page";
import {usePessoa} from "./usePessoa";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import { Divider } from "primereact/divider";

export const PessoaDetalhe = () => {
    const {
        formCadastro,
        onVoltar,
        onEditar,
        isLoading,
        toast
    } = usePessoa();

    const form = formCadastro;

    return (
        <Page title={'Visualizar Pessoa'} breadCrumb={['Gerenciamento', 'Visualizar Pessoa']} loading={isLoading}>
            <>
                <Toast ref={toast}/>

                <h4>Dados do Pessoa</h4>
                <Divider></Divider>
                <div className='p-fluid p-formgrid p-grid'>
                    <div className='p-field p-col-9'>
                        <label>Nome do Pessoa</label>
                        {formCadastro.values.nome}
                    </div>
                </div>
                <div className='p-d-flex p-jc-end'>
                    <Button type="button" label="Voltar" className=" p-button-secondary"
                            onClick={() => onVoltar()} color='accent'/>
                    <Button type="button" label="Editar" color="accent"
                            onClick={() => onEditar(form.values.id)} className="p-ml-2 "/>
                </div>
            </>
        </Page>
    );
}
