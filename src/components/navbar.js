import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GiSandsOfTime } from "react-icons/gi";

const StyledNavLink = styled(NavLink)`
  font-size: 20px;
  font-weight: 400;
  padding: 5px 20px;
  color: #3b57ab;
  transition: color 0.2s;

  &:hover {
    text-decoration: none;
    color: #f67094;
  }

  &.active {
    color: #f67094;
    font-weight: 700;
  }
`;

const StyledBrand = styled(GiSandsOfTime)`
  display: block;
  transform: rotate(20deg);
  margin-right: 20px;
  margin-top: 10px;
  color: #3b57ab;
  transition: transform 0.5s;

  &:hover {
    cursor: pointer;
    color: #3b57ab;
    transform: rotate(-20deg);
  }
`;

const CustomNav = () => {
  return (
    <Navbar className="mt-2" expand="md">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto ml-2">
          <StyledNavLink to="/new">New</StyledNavLink>
          <StyledNavLink to="/pending">Pending</StyledNavLink>
          <StyledNavLink to="/approved">Approved</StyledNavLink>
          <StyledNavLink to="/rejected">Rejected</StyledNavLink>
        </Nav>
      </Navbar.Collapse>
      <div className="ml-auto my-auto">
        <a href="https://capsule.yalewli.org">
          <StyledBrand size={50} />
        </a>
      </div>
    </Navbar>
  );
};

export default CustomNav;
