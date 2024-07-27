import styles from './item.module.css';
import {toRupiah} from "@/app/lib/Utils";

export default function Item({ label, imageUrl, desc, price, isSelected, onClick, isDisabled }) {
    return (
        <div className={`${styles.container} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.disabled : ''}`}
            onClick={isDisabled ? null : onClick}>
            <div className={styles.upper}>
                <div className={styles.title}>
                    <span>{label}</span>
                </div>
                <span className={styles.description}>({desc})</span>
                <div className={styles.image}>
                    <img src={imageUrl} alt="product" />
                </div>
            </div>
            <div className={styles.lower}>
                <span>{toRupiah(price)}</span>
            </div>
        </div>
    );
}

