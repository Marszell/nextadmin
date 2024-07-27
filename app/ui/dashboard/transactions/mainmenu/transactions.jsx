import Image from 'next/image'
import styles from './transactions.module.css'
import {toRupiah} from "@/app/lib/Utils";


const Transactions = ({ orders }) => {

    return(
        <div className={styles.container}>
            <h2 className={styles.title}>Lastest Transactions</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Product Name</td>
                        <td>Status</td>
                        <td>Date</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => {
                        const date = new Date(order.created_at).toLocaleDateString('en-US', { timezone: 'Asia/Jakarta' });

                        return <tr key ={order.id} >
                            <td>
                                <div className={styles.user}>
                                <Image 
                                src={order.product.image_url}
                                alt="" 
                                width={40} 
                                height={40} 
                                className={styles.userImage}
                                />
                                {order.product.name}
                                </div>
                            </td>
                            <td><span className={`${styles.status} ${styles.done}`}>{order.status_order}</span></td>
                            <td>{date}</td>
                            <td>{toRupiah(order.price)}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Transactions