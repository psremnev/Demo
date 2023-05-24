import { jsx as _jsx } from "react/jsx-runtime";
export default function ({ expanded, onClick }) {
    return _jsx("div", { className: `treeItemTemplate-expander ${expanded ? 'ti-arrow-circle-down' : 'ti-arrow-circle-right'}`, onClick: onClick });
}
