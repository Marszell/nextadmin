import { MdSupervisedUserCircle } from 'react-icons/md';
import styles from './card.module.css';

//this function is for display card in admin page, and show total of games, product, and order
const Card = ({ label, quantity }) => {
    return (
        <div className={styles.container}>
            <MdSupervisedUserCircle size={24}/>
            <div className={styles.texts}>
                <span className={styles.title}>Total {label}</span>
                <span className={styles.number}>{quantity}</span>
            </div>
        </div>
    )
}

export default Card;