import React from "react"

import  styles from "./Footer.module.css"

//icons
import { FaLinkedin, FaGithub  } from "react-icons/fa"
import { PiInstagramLogoFill }   from "react-icons/pi"

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
        <div>
          <p>Desenvolvido por @mendjoy</p>
          <div className={styles.socialLinks}> 
            <p><a href='https://www.linkedin.com/in/mendjoy/' target="_blank"><FaLinkedin /></a></p>
            <p><a href='https://www.instagram.com/mendjoy/' target="_blank"><PiInstagramLogoFill /></a></p>
            <p><a href='https://github.com/mendjoy' target="_blank"><FaGithub /></a></p>
          </div>
        </div>
    </footer>
  )
}

export default Footer
