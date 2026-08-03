import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="app">
      <Sidebar />

      <div className="content">
        <Navbar />

        <main className="page">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;