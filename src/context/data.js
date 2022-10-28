import React, { useState, createContext, useContext } from "react";

export const PageDataContext = createContext();

export const usePageDataContext = () => useContext(PageDataContext);

export const PageDataProvider = ({ children }) => {
  const [pageData, setPageData] = useState({steps:["step1","step2","step3"]});

  return (
    <PageDataContext.Provider value={{ pageData: pageData, setPageData: setPageData }}>
      {children}
    </PageDataContext.Provider>
  );
};