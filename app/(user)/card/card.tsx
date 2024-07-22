import styles from './card.module.css'

export default function Card ({name,imageUrl}){
    return(
        <div className={styles.container}>
            <img className={styles.image} src={imageUrl} />
            <div className={styles.text}>
                {name}
            </div>
        </div>
    )
}