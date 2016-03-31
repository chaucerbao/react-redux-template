import "./style.css";

import React from "react";

const DefaultLayout = ({ children }) => {
  return (
    <div className="site">
      <header className="site__header"></header>
      <main className="site__body">{children}</main>
      <footer className="site__footer"></footer>
    </div>
  );
};

export default DefaultLayout;
