import styles from './footer.module.css'

//this function is for display footer in layout
export default function Footer (){
    return (
        <div className={styles.container}>
            <div className={styles.logo}>VFun</div>
            <div className={styles.text}>© All rights reserved.</div>
        </div>
    )
}