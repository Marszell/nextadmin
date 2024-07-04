"use client"
import { usePathname } from 'next/navigation'
import styles from './navbar.module.css'
import { MdNotifications, MdOutlineChat, MdSearch } from 'react-icons/md'

export default function Navbar () {

    const pathname = usePathname();

    return(
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.title}>VFun</div>
            </div>
            <div className={styles.center}>
                <div className={styles.search}>
                    <MdSearch/>
                    <input type="text" placeholder="Search..." className={styles.input}/>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.icons}>
                    <MdOutlineChat size={20} />
                    <MdNotifications size={20} />
                </div>
            </div>
        </div>
    )
}