import Image from "next/image"
import Link from "next/link"
import styles from "@/app/ui/dashboard/transactions/transaction.module.css"
import Search from "@/app/ui/dashboard/search/search"
import Pagination from "@/app/ui/dashboard/pagination/pagination"

const TransactionsPage = () => {
    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a user..."/>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name Game</td>
                        <td>Name Product</td>
                        <td>ID Game User</td>
                        <td>Status</td>
                        <td>Date</td>
                        <td>Payment Method</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><div className={styles.product}>
                            <Image 
                                src="/noproduct.jpg" 
                                alt="gambar" 
                                width={40} 
                                height={40} 
                                className={styles.productImage}
                            />
                            Genshin
                        </div>
                        </td>
                        <td>Welkin</td>
                        <td>800052546</td>
                        <td>
                        <span className={`${styles.status} ${styles.pending}`}>Pending</span>
                        </td>
                        <td>14.02.2024</td>
                        <td>e-wallet</td>
                        <td>Rp 50.000</td>
                    </tr>
                </tbody>
            </table>
            <Pagination/>
        </div>
    )
}

export default TransactionsPage