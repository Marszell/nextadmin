import styles from './footer.module.css'

export default function Footer (){
    return (
        <div className={styles.container}>
            <div className={styles.logo}>VFun</div>
            <div className={styles.text}>© All rights reserved.</div>
        </div>
    )
}