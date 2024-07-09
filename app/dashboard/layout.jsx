import Navbar from "../ui/dashboard/navbar/navbar"
import Sidebar from "../ui/dashboard/sidebar/sidebar"
import styles from "../ui/dashboard/dashboard.module.css"
import Footer from "../ui/dashboard/footer/footer"
import {Toaster} from "react-hot-toast";

const Layout = ({children}) => {
    return(
        <div className={styles.container}>
            <Toaster position={"bottom-left"}/>
            <div className={styles.menu}>
                <Sidebar/>
            </div>
            <div className={styles.content}>
                <Navbar/>
                {children}
                <Footer />
            </div>
        </div>
    )
}

export default Layout