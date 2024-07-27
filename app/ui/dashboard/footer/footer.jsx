import styles from './footer.module.css';

//this function is for display footer in admin layout
const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>Marcel Dev</div>
            <div className={styles.text}>© All rights reserved.</div>
        </div>
    );
};

export default Footer;