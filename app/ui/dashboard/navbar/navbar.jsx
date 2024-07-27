"use client"
import { usePathname } from 'next/navigation'
import styles from './navbar.module.css'

//this function is for display navbar in layout admin page
const Navbar = () => {

    const pathname = usePathname();

    return(
        <div className={styles.container}>
            <div className={styles.title}>{pathname.split("/").pop()}</div>
        </div>
    )
}

export default Navbar