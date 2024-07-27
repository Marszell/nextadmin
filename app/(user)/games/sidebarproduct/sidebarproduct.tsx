import styles from './sidebar.module.css'

//thi product is for display the information game in game section.
export default function Sidebar({ image_url, name, description }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.image}>
                <img src={image_url} alt="banner game" />
            </div>
            <div className={styles.title}>
                <h2>{name}</h2>
            </div>
            <div className={styles.buttons}>
                <div className={styles.button}>
                    <span>Pembayaran yang Aman</span>
                </div>
                <div className={styles.button}>
                    <span>Layanan Pelanggan 24/7</span>
                </div>
            </div>
            <div className={styles.description}>
                <span>{description}</span>
            </div>
        </div>
    )
}
