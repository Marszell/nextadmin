"use client"
import Image from "next/image"
import Link from "next/link"
import styles from "@/app/ui/dashboard/transactions/transaction.module.css"
import Search from "@/app/ui/dashboard/search/search"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import { fetchOrders, fetchOrdersV2 } from "@/app/lib/OrderRepository"
import { useEffect, useState } from "react"
import axios from "axios"

const TransactionsPage = () => {
    // const [order] = await 
    const [orders,setOrders] = useState([])

    useEffect( () => {
        fetchOrders();
    },[])

    // const fetchOrdersV2 = async () => {
    //     const orderRes = await axios.get("/api/order")
    //     setOrders(orderRes.data.data)
    // } 

    const fetchOrders = async () => {
        const orderRes = await axios.get("/api/orders");
        setOrders(orderRes.data.data)
    } 
        
    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a user..."/>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name Product</td>
                        <td>ID Game User</td>
                        <td>Status</td>
                        <td>Date</td>
                        <td>Payment Method</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) =>{
                        const date = new Date(order.created_at).toLocaleDateString('en-US', { timezone: 'Asia/Jakarta' });
                        return <tr key={order.id}>
                            <td>
                                <div className={styles.product}>
                                <Image 
                                src={order.product_image_url}
                                alt="gambar" 
                                width={40} 
                                height={40} 
                                className={styles.productImage}
                                />
                                {order.product_name}
                                </div>
                            </td>
                            <td>{order.uid}</td>
                            <td><span className={`${styles.status} ${styles.done}`}>{order.status_order}</span></td>
                            <td>{date}</td>
                            <td>{order.payment_name}</td>
                            <td>{order.price}</td>
                        </tr>
                        })}
                </tbody>
            </table>
            <Pagination/>
        </div>
    )
}

export default TransactionsPage
