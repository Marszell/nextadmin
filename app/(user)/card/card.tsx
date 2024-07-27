import styles from './card.module.css'

//this function is for dislay card from dashboard
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