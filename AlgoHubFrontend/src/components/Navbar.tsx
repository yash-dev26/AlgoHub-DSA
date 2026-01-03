function Navbar() {
  return (
    <div className="
      navbar bg-base-100/80 backdrop-blur
      border-b border-base-300
      px-6 top-0 z-50
    ">
      <div className="navbar-start">
        <label htmlFor="app-drawer" className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>
      {/* Brand */}
      <div className="navbar-center">
        <a className="btn btn-ghost text-4xl font-bold tracking-wide">
          <span className="text-primary">Algo</span>
          <span className="text-base-content">Hub</span>
        </a>
      </div>

      {/* Actions */}
      <div className="navbar-end gap-3">

        {/* Notifications */}
        <div className="dropdown dropdown-end">
          <button className="
            btn btn-ghost btn-circle
            hover:bg-primary/10
            transition
          ">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-sm badge-primary indicator-item">
                8
              </span>
            </div>
          </button>
        </div>

        {/* Profile */}
        <div className="dropdown dropdown-end">
          <button className="
            btn btn-ghost btn-circle avatar
            hover:bg-primary/10
            transition
          ">
            <div className="
              w-9 rounded-full
              ring ring-primary/40
              ring-offset-base-100 ring-offset-2
            ">
              <img
                src="https://i.pravatar.cc/100"
                alt="User avatar"
              />
            </div>
          </button>

          <ul className="
            menu menu-sm dropdown-content
            mt-4 w-52 rounded-xl
            bg-base-100 shadow-xl
            border border-base-200
            z-1
          ">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge badge-sm badge-primary">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li className="text-error">
              <a>Logout</a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Navbar;
