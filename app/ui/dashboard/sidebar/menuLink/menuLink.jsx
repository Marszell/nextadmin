"use client"

import Link from 'next/link'
import styles from './menuLink.module.css'
import { usePathname } from 'next/navigation'

//this function is for path of menulink in leftside
const MenuLink = ({item}) => {

    const pathname = usePathname()

    
    return (
        <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
            {item.icon}
            {item.title}
            
        </Link>
    )
}

export default MenuLink