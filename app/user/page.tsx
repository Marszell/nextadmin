import Card from './card/card'
import Carousel from './carousel/carousel'
import styles from './dashboard.module.css'
import Footer from './footer/footer'
import Navbar from './navbar/navbar'

export default function Dashboard(){
    return(
        <div className={styles.wrapper}>
            <Navbar />
            <div className={styles.main}>
                <div className={styles.carousel}>
                    <Carousel />
                </div>
                <div className={styles.content}>
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>

    )

}