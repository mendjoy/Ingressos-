import React, { useState, useEffect } from "react"

//css
import  styles from "./Navbar.module.css"
import Link from 'next/link'

//icons
import { GrHomeRounded } from "react-icons/gr"
import { BsCalendar4Event } from "react-icons/bs"
import { IoSearch } from "react-icons/io5"
import { FaRegUser } from "react-icons/fa"
import { MdOutlineExpandMore } from "react-icons/md"
import { RiLogoutBoxRLine } from "react-icons/ri"

//context
import { useAuth } from "../../context/AuthContext"

//api
import getData from "@/service/api/getData"
import { useSearch } from "@/context/SearchContext"

const Navbar = () => {

    const { user, authority, logout } = useAuth()
    const { setSearchResults, setTotalPagesResult } = useSearch()
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [searchParam, setSearchParam] = useState("")

    const toggleDropDown = () => {
        setDropdownVisible(!dropdownVisible)
    }

    const getEventByName = async (e) => {

        e.preventDefault()

        try {
            
            const data = await getData(`/event/search?name=${searchParam}`)

            if(data.error){
                
                setErrorMessage(data.message)
                
            }else{

                setSearchResults(data.content)
                setTotalPagesResult(data.totalPages)
                
            }

        } catch (error) {

            setErrorMessage(error.message)
        }
    }

    useEffect(() => {
        setDropdownVisible(false)
    }, [user])

    return (
        <div className={styles.navbarContainer}>
            <div>
                <Link href="/" className={styles.logo}>
                    <h1>Event Pass</h1>
                </Link>
            </div>

            <div>
                <form  className={styles.form} onSubmit={getEventByName}>
                    <div className={styles.searchContainer}>
                        <input type="text" 
                               placeholder="Buscar por eventos" 
                               className={styles.searchInput}
                               value={searchParam}
                               onChange={(e) => setSearchParam(e.target.value)}/>

                        <button type="submit" className={styles.searchButton}><IoSearch className={styles.searchIcon}/></button>
                    </div>
                </form> 
            </div>
            
            <div>
                <nav className={styles.navbarLinks}>
                    <Link href="/"><GrHomeRounded   className="icon"/> Home</Link>
                    <a href="#"><BsCalendar4Event className="icon"/> Eventos</a>
                    { user ? 
                        ( <div className={styles.dropdown}>
                            <span onClick={ toggleDropDown }><FaRegUser className="icon"/> {user} <MdOutlineExpandMore /></span> 
                            
                            {dropdownVisible && (
                                <div className={styles.dropdownMenu}>
                                    <Link href="/user/profile" className={styles.dropdownItem} onClick={toggleDropDown}>Minha Conta</Link>
                                    {authority == true && (<Link href="/event/register" className={styles.dropdownItem} onClick={toggleDropDown}>Cadastrar Evento</Link>)}
                                    <Link href="#" className={styles.dropdownItem} onClick={toggleDropDown}>Meus Ingressos</Link>
                                    <Link href="#" className={styles.dropdownItem} onClick={toggleDropDown}>Favoritos</Link>
                                    <Link href="/user/password" className={styles.dropdownItem} onClick={toggleDropDown}>Alterar Senha</Link>
                                    <button onClick={ logout } className={styles.dropdownItem}> <RiLogoutBoxRLine /> Sair</button>
                                </div>
                            )}
                         </div>) :
                        ( <Link href="/user/login"><FaRegUser className="icon"/> Login</Link>)
                    }
                </nav>
            </div> 
        </div>
    )
}
export default Navbar