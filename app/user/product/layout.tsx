import Footer from '../footer/footer'
import Navbar from '../navbar/navbar'
import styles from './product.module.css'

export default function Layoutt({children}){
    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <Navbar/>
                {children}
                <Footer />
            </div>
        </div>
    )
}