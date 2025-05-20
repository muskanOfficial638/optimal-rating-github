// contexts/MetaContext.js
import React, { createContext, useState } from 'react';

const MetaContext = createContext();

const MetaProvider = ({ children }) => {
  const [meta, setMeta] = useState({
    title: 'Default Title',
    description: 'Default Description',
    imageUrl: '',
    url: ''
  });

  return (
    <MetaContext.Provider value={{ meta, setMeta }}>
      {children}
    </MetaContext.Provider>
  );
};

export { MetaContext, MetaProvider };
