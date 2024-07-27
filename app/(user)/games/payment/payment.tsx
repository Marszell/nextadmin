import styles from './payment.module.css'

export default function Payment({ label, imageUrl, isSelected,onClick}){
    return(
        <div className={`${styles.container} ${isSelected ? styles.selected : ''}`}
            onClick={onClick}>
            <div className={styles.leftside}>
                <div className={styles.imagepayment}>
                    <img src={imageUrl} alt="icon payment" />
                </div>
                <div className={styles.paymentname}>
                    <span>{label}</span>
                </div>
            </div>
        </div>
    )
}