import { IconLibrary, registerLibrary } from "./iconLibrary";

let defaultIconsPathBase = './icons';
export const setDefaultIconsPath = (iconsPath: string) => defaultIconsPathBase = iconsPath;

const defaultLibrary: IconLibrary = {
    name: 'default',
    resolve: name => `${defaultIconsPathBase}/${name}.svg`,
}

registerLibrary(defaultLibrary);
