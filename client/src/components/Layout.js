import React from 'react';
import Footer from './Footer';

const Layout = ({ actions, children }) => (
  <div className="page">
    <header className="topbar">
      <div className="brand">
        <img src="/national-id-logo.png" alt="National ID" />
        <div>
          Fayda Mock Relying Party
          <small>OIDC test application</small>
        </div>
      </div>
      {actions}
    </header>
    <main className="content">{children}</main>
    <Footer className="site-footer" />
  </div>
);

export default Layout;
