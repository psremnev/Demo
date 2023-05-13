import React from 'react';

const AppContext = React.createContext({theme: '', lang: '', urlInfo: {}, changeAppContext: (lang, theme) => {}});
AppContext.displayName = 'AppContext';

export default AppContext;