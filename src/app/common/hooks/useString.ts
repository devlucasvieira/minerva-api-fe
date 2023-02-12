export const useString = () => {
    const from = "ãàáäâèéëêìíïîõòóöôùúüûñç·/_,:;";
    const to = "aaaaaeeeeiiiiooooouuuunc------";

    const normalize = (val: string) => {
        let str = val.replace(/^\s+|\s+$/g, '').toLowerCase();

        // remove accents, swap ñ for n, etc
        for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        return str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    };

    const compareNormalized = (val1: string, val2: string) => {
        return normalize(val1).localeCompare(normalize(val2));
    }

    const containsNormalized = (val1: string, val2: string) => {
        return normalize(val1).indexOf(normalize(val2)) >= 0;
    }

    return {normalize, compareNormalized, containsNormalized};
}