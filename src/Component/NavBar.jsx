import {Nav} from "react-bootstrap";
import '../CSS/NavBar.css'
import {NavLink} from "react-router";

export default function NavBar() {
    return (
        <Nav className="justify-content-center gap-3" id="NavBar"  >
            <Nav.Item>
                <NavLink preventScrollReset={true}
                         className={({isActive}) => (isActive ? "active" : "")}
                         to="/">
                    Active
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink preventScrollReset={true}
                         className={({isActive}) => (isActive ? "active" : "")}
                         to="/test">
                    test
                </NavLink>
            </Nav.Item>
        </Nav>
    )
}