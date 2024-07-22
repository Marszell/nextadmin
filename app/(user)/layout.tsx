import Footer from './footer/footer'
import Navbar from './navbar/navbar'
import styles from './dashboard.module.css'

export default function Layout({children}){
    return(
        <div className={styles.container}>
            <div className={styles.layout}>
            </div>
            <div>
                <Navbar/>
                {children}
                <Footer />
            </div>
        </div>
    )
}