export default function({expanded, onClick}) {
    return <div className={ `treeItemTemplate-expander ${expanded ? 'ti-arrow-circle-down' : 'ti-arrow-circle-right'}`}
                onClick={onClick}
            />;
}