import React, { useState, createContext } from 'react';

export const ContentContext = createContext(null);

function ContentProvider({children}) {
  const [content, setContent] = useState("");

  return (
  <ContentContext.Provider value={{content, setContent}}>
    {children}
  </ContentContext.Provider>
  )
}

export default ContentProvider