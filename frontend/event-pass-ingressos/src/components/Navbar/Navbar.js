import React, { useState, useEffect } from 'react'

//css
import  styles from "./Navbar.module.css";
import { Link } from 'react-router-dom'

//icons
import { GrHomeRounded } from "react-icons/gr";
import { BsCalendar4Event } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdOutlineExpandMore } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";

//context
import { useAuth } from "../../context/AuthContext"

const Navbar = () => {

    const { user, logout } = useAuth()
    const [dropdownVisible, setDropdownVisible] = useState(false)

    const toggleDropDown = () => {
        setDropdownVisible(!dropdownVisible)
    }

    useEffect(() => {
        setDropdownVisible(false)
    }, [user])

    return (
        <div className={styles.navbarContainer}>
            <div>
                <Link to={"/"} className={styles.logo}>
                    <h1>Event Pass</h1>
                </Link>
            </div>

            <div>
                <form  className={styles.form}>
                    <div className={styles.searchContainer}>
                        <input type="text" 
                               placeholder="Buscar por eventos" 
                              className={styles.searchInput}/>

                        <button type="submit" className={styles.searchButton}><IoSearch className={styles.searchIcon}/></button>
                    </div>
                </form> 
            </div>
            
            <div>
                <nav className={styles.navbarLinks}>
                    <Link to="/"><GrHomeRounded   className="icon"/> Home</Link>
                    <a href="#"><BsCalendar4Event className="icon"/> Eventos</a>
                    <a href="#"><IoTicketOutline  className="icon"/> Ingressos</a>

                    { user ? 
                        ( <div className={styles.dropdown}>
                            <span onClick={ toggleDropDown }><FaRegUser className="icon"/> {user} <MdOutlineExpandMore /></span> 
                            
                            {dropdownVisible && (
                                <div className={styles.dropdownMenu}>
                                    <Link to="/profile" className={styles.dropdownItem} onClick={toggleDropDown}>Minha Conta</Link>
                                    <Link to="#" className={styles.dropdownItem} onClick={toggleDropDown}>Meus Ingressos</Link>
                                    <Link to="#" className={styles.dropdownItem} onClick={toggleDropDown}>Favoritos</Link>
                                    <button onClick={ logout } className={styles.dropdownItem}> <RiLogoutBoxRLine /> Sair</button>
                                </div>
                            )}
                         </div>) :
                        ( <Link to="/login"><FaRegUser className="icon"/> Login</Link>)
                    }
        
                </nav>
            </div> 
        </div>
    )
}

export default Navbar