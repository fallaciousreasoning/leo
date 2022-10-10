import { IconLibrary, registerLibrary } from "./iconLibrary";

let defaultIconsPathBase = './icons';
export const setDefaultIconsPath = (iconsPath: string) => defaultIconsPathBase = iconsPath;

const defaultLibrary: IconLibrary = {
    name: 'default',
    resolve: name => `${defaultIconsPathBase}/${name}.svg`,
    mutate: (icon, name) => {
        // Width & height are managed by the Icon component.
        icon.removeAttribute('width');
        icon.removeAttribute('height');

        // Convention in brave-icons is that colored icons end with -color (i.e.
        // product-brave-color), in which case we shouldn't override the fill.
        if (name.endsWith('-color')) return;

        // Non color icons are monocolor, so we should set the fill attribute on
        // all path & svg elements.
        for (const filled of icon.querySelectorAll('svg, path')) {
            filled.setAttribute('fill', 'currentColor');
        }
    }
}

registerLibrary(defaultLibrary);
