/* eslint-disable react/prop-types */
import { createContext, useRef, useState } from "react";

export const BasicContext = createContext(null);

const BasicProvider = ({ children }) => {
  const [sidebarOpen, setSideBarOpen] = useState(true);
  const [modalImage, setModalImage] = useState(true);
  const [reload, setReload] = useState(false);
  const componentRef = useRef();

  const info = {
    sidebarOpen,
    setSideBarOpen,
    modalImage,
    setModalImage,
    componentRef,
    setReload,
    reload,
  };
  return <BasicContext.Provider value={info}>{children}</BasicContext.Provider>;
};

export default BasicProvider;
