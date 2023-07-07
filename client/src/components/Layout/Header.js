import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';
import { Dropdown } from 'react-bootstrap';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ""
        })
        localStorage.removeItem("auth")
        toast.success("Logout Successfully")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Link to="/" className="navbar-brand">
                            <FaShoppingCart /> Ecommerce App
                        </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" style={{marginLeft: "10px"}}>Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Dropdown>
                                    <Dropdown.Toggle as={NavLink} id="navbarDropdown" className="dropdown-button" style={{ marginRight:"10px"}}>
                                        Categories
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as={NavLink} to="/categories">
                                            All Categories
                                        </Dropdown.Item>
                                        {categories.map((c) => (
                                            <Dropdown.Item key={c._id} as={Link} to={`/category/${c.slug}`}>
                                                {c.name}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                            {
                                !auth.user ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink to="/register" className="nav-link" href="#" aria-current="true">Register</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to="/login" className="nav-link" href="#" aria-current="true">Log In</NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="nav-item dropdown">
                                            <Dropdown>
                                                <Dropdown.Toggle as={NavLink} id="navbarDropdown" className="dropdown-button">
                                                    {auth?.user?.name}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item as={NavLink} to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                                                        }`}>
                                                        Dashboard
                                                    </Dropdown.Item>
                                                    <Dropdown.Item as={NavLink} onClick={handleLogout} to="/login">
                                                        Log Out
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </li>
                                    </>
                                )
                            }
                            <li className="nav-item" style={{paddingTop: "7px"}}>
                                <Badge count={cart?.length} showZero>
                                    <NavLink to="/cart" className="nav-link" style={{paddingTop: "7px"}}>Cart</NavLink>
                                </Badge>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;