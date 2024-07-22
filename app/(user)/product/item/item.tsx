import styles from './item.module.css';

// export default function Item({ isSelected, onClick }) {
//     return (
//         <div className={`${styles.container} ${isSelected ? styles.selected : ''}`}
//             onClick={onClick}>
//             <div className={styles.upper}>
//                 <div className={styles.title}>
//                     <span>8080 Genesis Crystal</span>
//                 </div>
//                 <span className={styles.description}>(6480 + 1600 Bonus)</span>
//                 <div className={styles.image}>
//                     <img src="/iconngenesis.png" alt="product" />
//                 </div>
//             </div>
//             <div className={styles.lower}>
//                 <span>Rp 1.460.000</span>
//             </div>
//         </div>
//     );
// }

export default function Item({ name, imageUrl, desc, price },{isSelected, onClick}) {
    return (
        <div className={`${styles.container} ${isSelected ? styles.selected : ''}`}
            onClick={onClick}>
            <div className={styles.upper}>
                <div className={styles.title}>
                    <span>{name}</span>
                </div>
                <span className={styles.description}>({desc})</span>
                <div className={styles.image}>
                    <img src={imageUrl} alt="product" />
                </div>
            </div>
            <div className={styles.lower}>
                <span>{price}</span>
            </div>
        </div>
    );
}

