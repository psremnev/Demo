/**
 * Функция открытия дилога выбора файла
 * @param multiSelect
 * @param extensions
 * @returns FileList
 */
export const selectFiles = (multiSelect = true, extensions = []) => {
    return new Promise((resolve) => {
        const input = Object.assign(document.createElement('input'), {
            type: 'file',
            multiply: multiSelect,
            accept: extensions.map((ext) => `.${ext}`).join(),
        });
        const openFileChooser = input.click;
        openFileChooser.apply(input);
        input.onchange = (e) => {
            resolve(e.target.files);
        };
    });
};
