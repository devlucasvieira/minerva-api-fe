import {Page} from "../../../common/component/Page";
import {useContato} from "./useContato";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import { Divider } from "primereact/divider";

export const ContatoDetalhe = () => {
    const {
        formCadastro,
        onVoltar,
        onEditar,
        isLoading,
        toast
    } = useContato();

    const form = formCadastro;

    return (
        <Page title={'Visualizar Contato'} breadCrumb={['Gerenciamento', 'Visualizar Contato']} loading={isLoading}>
            <>
                <Toast ref={toast}/>
                <h4>Dados do Contato</h4>
                <Divider></Divider>
                <div className='p-fluid p-formgrid p-grid'>
                    <div className='p-field p-col-9'>
                        <label>Descrição do Contato</label>
                        {formCadastro.values.informacao}
                    </div>
                    <div className='p-field p-col-3'>
                        <label>Meio de contato</label>
                        {formCadastro.values?.tipo_contato?.tipo}
                    </div>
                </div>
                <div className='p-d-flex p-jc-end'>
                    <Button type="button" label="Voltar" className=" p-button-secondary"
                            onClick={() => onVoltar()} color='accent'/>
                    <Button type="button" label="Editar" color="accent"
                            onClick={() => onEditar(form.values)} className="p-ml-2 "/>
                </div>
            </>
        </Page>
    );
}
