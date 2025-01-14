import { Navbar, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

const NavBar = () => {
  return (
    <Navbar position="static" className="bg-blue-200 dark:bg-gray-800">
      <div className="container">
        <NavbarContent className="flex gap-4" justify="center">
          <NavbarItem>
            <Button as={Link} color="primary" href="http://localhost:5173/countrylist" variant="flat">
              Country List
            </Button>
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
};

export default NavBar;
