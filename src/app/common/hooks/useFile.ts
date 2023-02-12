// @ts-ignore
import {default as reactImageize} from 'react-image-size';

export const useFile = () => {
    const toBase64 = (file: any): Promise<string> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve((fileReader.result as string).split('base64,')[1]);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    };

    const checkImageSize = async (base64: string, expectedWidth: number, expectedHeight: number) => {
        const {width, height} = await reactImageize(toBase64URL(base64));

        return width === expectedWidth && height === expectedHeight;
    }

    const toBase64URL = (base64: string | undefined) => {
        if (!base64) {
            return undefined;
        }

        return `data:image/png;base64,${base64}`;
    }

    return {toBase64, toBase64URL, checkImageSize};
}