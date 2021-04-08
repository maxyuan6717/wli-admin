import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  font-size: 20px;
  font-weight: 500;
  padding: 5px 10px;

  &:hover {
    text-decoration: none;
  }

  &.active {
    color: red;
  }
`;

const CustomNav = () => {
  return (
    <Navbar className="shadow-sm">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <StyledNavLink to="/new">New</StyledNavLink>
          <StyledNavLink to="/pending">Pending</StyledNavLink>
          <StyledNavLink to="/approved">Approved</StyledNavLink>
          <StyledNavLink to="/rejected">Rejected</StyledNavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNav;
