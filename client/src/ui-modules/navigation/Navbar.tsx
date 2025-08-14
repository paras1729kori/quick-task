import { useAuth } from "../../contexts/AuthProvider";
import { logout } from "../../services/auth";
import Help from "./Help";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <section className="w-full bg-base-100 sticky top-0 z-20">
      <nav className="navbar max-w-4xl mx-auto">
        <div className="flex-none">
          <Help />
        </div>
        <div className="flex-1 text-center px-2">
          <a className="font-semibold text-xl">Quick-Task-Master</a>
        </div>
        <div className="flex items-center gap-2">
          {user?.name && user?.email && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-slate-300 flex items-center justify-center">
                  <span className="font-semibold">
                    {user?.name[0]?.toUpperCase()}
                  </span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li onClick={() => logout()}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </section>
  );
}
