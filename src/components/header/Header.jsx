import React, { useEffect, useState } from 'react'
import "./style.scss"
import logo from "../../assets/FilmyLand-logo.png"
import ContentWrapper from '../contentWrapper/ContentWrapper'

//below 3 are icons imported from react
import { HiOutlineSearch } from 'react-icons/hi';
import { VscChromeClose } from 'react-icons/vsc';
import { SlMenu } from 'react-icons/sl';

import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
    const [show, setShow] = useState("top");  //to set the background color of header dynamically
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false)
    const [query, setQuery] = useState("");
    const [lastScrollY, setLastScrollY] = useState(200);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    function controlNavbar() {
        if (window.scrollY > 200) {
            if (lastScrollY > window.scrollY && !mobileMenu) {
                setShow("show")
            }
            else {
                setShow("hide");
            }
        }
        else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    }
    window.addEventListener('scroll', controlNavbar);


    function openSearch() {
        setMobileMenu(false);
        setShowSearch(true);
    }

    function openMobileMenu() {
        setMobileMenu(true);
        setShowSearch(false);
    }

    function navigationHandler(type) {
        navigate("/explore/" + type);
        setMobileMenu(false);
    }
    
    /*document.addEventListener('keyup', detectTabKey);

    function detectTabKey(e) {
        if (e.keyCode == 9) {
            console.log(e.key);
        }
    }
    */

    function searchQueryHandler(e) {
        if ((e.key === "Enter" || e.key=== "Tab") && query.length > 0) {
            navigate(`/search/${query}`)
            setTimeout(() => {
                setShowSearch(false);
                setQuery("");
            }, 500);
        }
    }

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>
                <ul className="menuItems">
                    <li
                        className='menuItem'
                        onClick={() => navigationHandler("movie")}
                    >
                        Movies
                    </li>
                    <li
                        className='menuItem'
                        onClick={() => navigationHandler("tv")}
                    >
                        Tv Shows
                    </li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>

                <div className='mobileMenuItems'>
                    <HiOutlineSearch onClick={openSearch} />

                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentWrapper>

            {showSearch &&
                (
                    <div className="searchBar">
                        <ContentWrapper>
                            <div className="searchInput">
                                <input
                                    type="text"
                                    placeholder="Search for a movie or tv show...."
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={searchQueryHandler}
                                />
                                <VscChromeClose
                                    onClick={() => setShowSearch(false)}
                                />
                            </div>
                        </ContentWrapper>
                    </div>
                )

            }
        </header>
    )
}

export default Header