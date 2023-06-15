import React, { useState, createContext } from 'react';

export const DocNameContext = createContext(null);

function DocProvider({children}) {
  const [docName, setDocName] = useState("");

  return (
  <DocNameContext.Provider value={{docName, setDocName}}>
    {children}
  </DocNameContext.Provider>
  )
}

export default DocProvider