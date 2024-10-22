"use client"
import {
    MdNotifications,
    MdOutlineChat,
    MdPublic,
    MdSearch,
  } from "react-icons/md";

import { usePathname } from 'next/navigation'
import styles from'./navbar.module.css';


/*import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndustry } from '@fortawesome/free-solid-svg-icons';
*/
const Navbar = () => {
    const pathname = usePathname();
    
    
    return (
        <div className={styles.container}>
            <div className={styles.title}>
            Entreprise Tunisienne d'Activités Pétrolières
            </div>
            
            
            <div className={styles.menu}>
                
            </div>
        </div>
    )
}
export default Navbar