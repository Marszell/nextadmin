import styles from './payment.module.css'

export default function Payment({ name, imageUrl, isSelected,onClick}){
    return(
        <div className={`${styles.container} ${isSelected ? styles.selected : ''}`}
            onClick={onClick}>
            <div className={styles.leftside}>
                <div className={styles.imagepayment}>
                    <img src={imageUrl} alt="icon payment" />
                </div>
                <div className={styles.paymentname}>
                    <span>{name}</span>
                </div>
            </div>
            {/* <div className={styles.rightside}>
                <div className={styles.price}>
                    <span>Rp 1.460.000</span>
                </div> */}
            {/* </div> */}
        </div>
    )
}