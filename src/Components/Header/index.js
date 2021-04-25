import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import {
    Navbar, NavbarBrand, Nav, NavItem, NavLink, Input,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

const Header = (props) => {
    const cartItems = props.cartdata.length;

    const productPageHandler = (event, flag) => {
        event.preventDefault();

        props.ProductPage(flag);
    }

    return (
        <div className="header">
            <Navbar color="dark" dark>
                <NavbarBrand onClick={(event) => { productPageHandler(event, true) }}>Order Catalogue</NavbarBrand>
                <Nav>
                    <NavItem>
                     <Input type="text" onChange={(event) => props.searchProduct(event.target.value)} 
                     placeholder="Search " />
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Category
                         </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => props.setCategory("")}>
                                All
                        </DropdownItem>
                            <DropdownItem onClick={() => props.setCategory("fashion")}>
                                Fashion
                        </DropdownItem>
                            <DropdownItem onClick={() => props.setCategory("electronics")}>
                                Electronics
                          </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem>
                        <NavLink onClick={(event) => { productPageHandler(event, false) }}><FontAwesomeIcon icon={faCartPlus} />{" "}{cartItems}
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}

export default Header;