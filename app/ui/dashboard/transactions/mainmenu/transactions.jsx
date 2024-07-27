import Image from 'next/image'
import styles from './transactions.module.css'
import { parseISO, format } from 'date-fns';
import axios from 'axios';


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
                            {/* <td><time dateTime={orders.created_at}>{format(date , 'LLLL d, yyyy')}</time></td> */}
                            <td>{date}</td>
                            <td>{order.price}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Transactions