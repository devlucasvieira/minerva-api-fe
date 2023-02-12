import {useCallback} from "react";

export const useUtil = () => {

    const classNames = (...args: any[]): string | undefined => {
        let classes = '';

        args.forEach( item => {
            Object.keys( item ).forEach( prop => {
                const classSelected = !!item[prop] ? prop : undefined;
                if (classSelected) {
                    classes = classes.concat( classSelected, ' ' );
                }
            } );
        } );

        return classes;
    }

    const isFormFieldValid = (name: keyof any, form: any) => {
        return !!(form.touched[name] && form.errors[name])
    };

    const showMessage = useCallback( ( toast: any, message: string, type: 'success' | 'info' | 'warn' | 'error' ) => {
        toast.current.show( { severity: type, sumary: 'minerva', detail: message } );
    }, [] );

    const removeAcento = (text: string) => {
		text = text.toLowerCase();
		text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
		text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
		text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
		text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
		text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
		text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
		return text;
	};


    const formatarCNPJ = (data: string) => {
		data = data === null ? '' : data;

		data = data.replace(/\D/g, '');

		for (let i = data.length; i < 14; i++) {
			data = data.replace('', '0');
		}

		//Coloca ponto entre o segundo e o terceiro dígitos
		data = data.replace(/^(\d{2})(\d)/, '$1.$2');
		//Coloca ponto entre o quinto e o sexto dígitos
		data = data.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
		//Coloca uma barra entre o oitavo e o nono dígitos
		data = data.replace(/\.(\d{3})(\d)/, '.$1/$2');
		//Coloca um hífen depois do bloco de quatro dígitos
		data = data.replace(/(\d{4})(\d)/, '$1-$2');

		return data;
	};


	const formatarCPF = (data: string) => {

		for (let i = data.length; i < 11; i++) {
			data = data.replace('', '0');
		}

		data = data.replace(/\D/g, '');
		data = data.replace(/(\d{3})(\d)/, '$1.$2');
		data = data.replace(/(\d{3})(\d)/, '$1.$2');
		data = data.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

		return data;
	};

    return { classNames, isFormFieldValid, showMessage, removeAcento,formatarCNPJ, formatarCPF };
}