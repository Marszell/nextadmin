import styles from './card.module.css'

export default function Card (){
    return(
        <div className={styles.container}>
            <img className={styles.image} src="/icongenshin.jpg" alt="icon" />
            <div className={styles.text}>
                Genshin Impact
            </div>
        </div>
    )
}