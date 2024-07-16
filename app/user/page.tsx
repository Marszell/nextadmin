import Link from 'next/link'
import Card from './card/card'
import Carousel from './carousel/carousel'
import styles from './dashboard.module.css'

export default function Dashboard(){
    return(
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.carousel}>
                    <Carousel />
                </div>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <span>Top Games</span>
                    </div>
                    <Link className={styles.game} href="/user/product">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </Link>
                </div>
            </div>
        </div>
    )
}