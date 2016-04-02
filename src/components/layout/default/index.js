// Dependencies
import React from "react";

// Styles
import "./style.css";

// Component
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
