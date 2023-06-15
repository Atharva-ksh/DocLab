import React, { useState, createContext } from 'react';

export const ContentContext = createContext(null);

function ContentProvider({children}) {
  const [content, setContent] = useState("");
  const [quill, setQuill] = useState();
  return (
  <ContentContext.Provider value={{content, setContent, quill, setQuill}}>
    {children}
  </ContentContext.Provider>
  )
}

export default ContentProvider