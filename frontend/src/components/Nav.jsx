import { Button } from 'flowbite-react'
import React from 'react'
import { Avatar, Dropdown, Navbar } from 'flowbite-react/lib/esm/components'
import { logout } from '../redux/actions/authAction'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
const Nav = () => {
    const dispatch = useDispatch()
    const getUserReducer = useSelector((state) => state.getUserReducer)
    const { loading, user, isLogged } = getUserReducer
    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <Navbar fluid={true} rounded={true}>
            <Navbar.Brand href="/">
                <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Flowbite
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                {isLogged ? (
                    <div className="flex items-center justify-center">
                        <Dropdown
                            arrowIcon={false}
                            inline={true}
                            label={
                                <Avatar
                                    alt="User settings"
                                    img={user.avatar}
                                    rounded={true}
                                />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">
                                    {user.name}
                                </span>
                                <span className="block truncate text-sm font-medium">
                                    {user.email}
                                </span>
                            </Dropdown.Header>
                            <Dropdown.Item onClick={logoutHandler}>
                                Log out
                            </Dropdown.Item>
                        </Dropdown>
                        <span className="self-center whitespace-nowrap m-3 font-semibold text-black">
                            {user.name}
                        </span>
                    </div>
                ) : (
                    <>
                        <Link to="login">
                            <Button>Admin</Button>
                        </Link>
                    </>
                )}

                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/navbars" active={true}>
                    Home
                </Navbar.Link>
                <Navbar.Link href="/navbars">About</Navbar.Link>
                <Navbar.Link href="/navbars">Services</Navbar.Link>
                <Navbar.Link href="/navbars">Pricing</Navbar.Link>
                <Navbar.Link href="/navbars">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Nav
