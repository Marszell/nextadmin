import styles from './pagination.module.css'

//this function is for display pagination in each page (games, user, product, payment, and order)
const Pagination = () => {
    return(
        <div className={styles.container}>
            <button className={styles.button} disabled>Previous</button>
            <button className={styles.button}>Next</button>
        </div>
    )
}

export default Pagination