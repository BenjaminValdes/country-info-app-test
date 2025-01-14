import { Navbar, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

const NavBar = () => {
  const port = import.meta.env.VITE_APP_PORT || 3000 // Default to 3000 if not set
  const baseUrl = `http://localhost:${port}/countrylist`

  return (
    <Navbar position="static" className="bg-blue-200 dark:bg-gray-800">
      <div className="container">
        <NavbarContent className="flex gap-4" justify="center">
          <NavbarItem>
            <Button as={Link} color="primary" href={baseUrl} variant="flat">
              Country List
            </Button>
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
};

export default NavBar;
