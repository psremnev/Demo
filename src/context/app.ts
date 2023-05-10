import React from 'react';

const AppContext = React.createContext({theme: '', lang: '', urlInfo: {}, changeAppContext: () => {}});
AppContext.displayName = 'AppContext';

export default AppContext;