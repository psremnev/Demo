import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @class Loader
 * @description Лоадер
 */
export default function Loader() {
    return (_jsx("div", { children: _jsx("img", { style: { height: 30, alignSelf: 'center', justifySelf: 'center' }, src: "public/loader.gif" }) }));
}
