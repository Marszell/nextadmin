import styles from './sidebar.module.css'

export default function Sidebar({ image_url, name, description }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.image}>
                <img src={image_url} alt="banner game" />
            </div>
            <div className={styles.title}>
                <h2>{name}</h2>
            </div>
            <div className={styles.buttons}>
                <div className={styles.button}>
                    <span>Pembayaran yang Aman</span>
                </div>
                <div className={styles.button}>
                    <span>Layanan Pelanggan 24/7</span>
                </div>
            </div>
            <div className={styles.description}>
                <span>{description}</span>
                {/*<p>Codashop menawarkan top up Genshin Impact yang mudah, aman, dan instan.</p>*/}
                {/*<p>Pembayaran tersedia melalui pulsa (Telkomsel, Indosat, Tri, XL, Smartfren), Codacash, QRIS, GoPay, OVO, DANA, ShopeePay, LinkAja, Kredivo, Alfamart, Indomaret, DOKU, Bank Transfer dan Card Payments.</p>*/}
                {/*<p>Beli Genesis Crystals dan Blessings of the Welkin Moon hanya dalam hitungan detik! Cukup masukkan User ID Genshin Impact, pilih server Anda, pilih jumlah Genesis Crystals atau Welkin Moon yang Anda inginkan, selesaikan pembayaran, dan Genesis Crystals atau Welkin Moon akan secara langsung ditambahkan ke akun Genshin Impact Anda.</p>*/}
                {/*<p>Untuk informasi lebih lengkap tentang Genesis Crystal bonuses.</p>*/}
            </div>
        </div>
    )
}
