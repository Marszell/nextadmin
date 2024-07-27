import Footer from './footer/footer'
import Navbar from './navbar/navbar'
import styles from './dashboard.module.css'
import {Toaster} from "react-hot-toast";

export default function Layout({children}){
    return(
        <div className={styles.container}>
            <Toaster position={"bottom-left"}/>
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