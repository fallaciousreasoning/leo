export interface IconLibrary {
    name: string;
    resolve: (name: string) => string;
    mutate?: (icon: SVGElement, name: string) => void;
}

const libraries: {[name: string]: IconLibrary} = {};

export const registerLibrary = (library: IconLibrary) => {
    libraries[library.name] = library;
}

export const unregisterLibrary = (library: IconLibrary) => {
    delete libraries[library.name];
}

export const getLibrary = (name: string) => libraries[name];
