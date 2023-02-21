import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { ReactComponent as UserProfile } from "../../assets/user-regular.svg";
import LogoutButton from "../LogoutButton";
import RefreshAlbumsButton from "../RefreshAlbumsButton";
import RefreshLibraryButton from "../RefreshLibraryButton";
import RefreshPlaylistsButton from "../RefreshPlaylistsButton";

const Navbar = () => {
  const { profile } = useSelector((state) => state.user);

  return (
    <div className="navbar bg-neutral">
      <div class="flex-1 gap-1">
        <NavLink
          to={"/"}
          className={(isActive) => (isActive ? "btn btn-primary " : "btn")}
        >
          Home
        </NavLink>
        <NavLink
          to={"/playlist"}
          className={(isActive) => (isActive ? "btn btn-primary " : "btn")}
        >
          Create Playlist
        </NavLink>
      </div>

      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {profile?.images?.[0] ? (
                <img
                  src={
                    profile.images?.[0]
                      ? profile.images?.[0]
                      : "../../assets/user-regular"
                  }
                  alt="user profile"
                />
              ) : (
                <UserProfile className="text-neutral-content fill-neutral-content" />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li className="text-primary">
              <a
                className="justify-between"
                href={profile?.external_urls?.spotify}
                target="_blank"
                rel="noreferrer"
              >
                {profile?.display_name}
              </a>
            </li>
            <li>
              <LogoutButton />
            </li>
            <li>
              <RefreshLibraryButton />
            </li>
            <li>
              <RefreshAlbumsButton />
            </li>
            <li>
              <RefreshPlaylistsButton />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
