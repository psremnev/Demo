import React from 'react';

const AppContext = React.createContext({theme: '', lang: '', urlInfo: {}, changeAppContext: (params: {lang: string, theme: string}) => {}});
AppContext.displayName = 'AppContext';

export default AppContext;