//css
import  styles from "./Navbar.module.css";
import { Link, useNavigate } from 'react-router-dom'

//icons
import { GrHomeRounded } from "react-icons/gr";
import { BsCalendar4Event } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
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
                    <a href="#"><GrHomeRounded className="icon"/> Home</a>
                    <a href="#"><BsCalendar4Event className="icon"/> Eventos</a>
                    <a href="#"><IoTicketOutline className="icon"/> Ingressos</a>
                    <a href="#"><FaRegUser className="icon"/> Login</a>
                </nav>
            </div> 
        </div>
    )
}

export default Navbar