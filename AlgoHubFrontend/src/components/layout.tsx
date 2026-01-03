import Navbar from "./Navbar";
import SideBar from "./Sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer">
      {/* SINGLE drawer toggle */}
      <input id="app-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        <Navbar />
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Sidebar MUST be here */}
      <SideBar />
    </div>
  );
}

export default Layout;
