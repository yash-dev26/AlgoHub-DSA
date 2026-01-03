function SideBar() {
  return (
    <div className="drawer-side">
      <label
        htmlFor="app-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      />

      <ul className="menu p-6 w-72 mt-10 min-h-full bg-base-200 text-base-content">
        <li className="menu-title">Navigation</li>
        <li><a>Dashboard</a></li>
        <li><a>Problems</a></li>
        <li><a>Submissions</a></li>
      </ul>
    </div>
  );
}

export default SideBar;
