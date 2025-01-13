import { Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { useRoleContext } from "../context/RoleContext";

export function NavBar() {
  const location = useLocation();
  const { status } = useRoleContext();
  return (
    <Navbar fluid>
      <Navbar.Brand as={Link} to="/">
        <img src="/favicon.ico" className="mr-3 h-6 sm:h-9" alt="AMS Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          AMS Project
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {status ? (
          <>
            <Navbar.Link
              as={Link}
              to="/logout"
              active={location.pathname === "/logout"}
            >
              Logout
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              to="/profile"
              active={location.pathname === "/profile"}
            >
              Profile
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              to="/dashboard"
              active={location.pathname === "/dashboard"}
            >
              Dashboard
            </Navbar.Link>
          </>
        ) : (
          <>
            <Navbar.Link as={Link} to="/" active={location.pathname === "/"}>
              Login
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              to="/register"
              active={location.pathname === "/register"}
            >
              Register
            </Navbar.Link>
          </>
        )}

        <ThemeToggle />
      </Navbar.Collapse>
    </Navbar>
  );
}
