"use client"

import Image from "next/image"
import Link from "next/link"
import styles from "@/app/ui/dashboard/payments/payments.module.css"
import Search from "@/app/ui/dashboard/search/search"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import {useEffect, useState} from "react";
import axios from "axios";

const PaymentsPage = () => {
    const [payments, setPayments] = useState([])

    useEffect( () => {
        fetchPayments()
    }, [])

    const fetchPayments = async () => {
        const paymentRes = await axios.get("/api/payments")
        setPayments(paymentRes.data.data)
    }

    const onDelete = async (id) => {
        await axios.delete(`/api/payments/${id}`)
        await fetchPayments()
    }

    const onChange = async (event) => {
        const filteredPayments = await axios.get(`/api/payments`, {
            params: {
                name: event.target.value,
            }
        });
        setPayments(filteredPayments.data.data)
    }

    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a payments..." onChange={onChange} />
                <Link href="/dashboard/payments/add">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Logo</td>
                        <td>Name</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                {payments !== undefined && payments.map((payment) => (
                    <tr key = {payment.id}>
                        <td>
                            <div className={styles.product}>
                                <Image
                                    src={payment.image_url}
                                    alt=""
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </td>
                        <td>{payment.name}</td>
                        <td>
                            <div className={styles.buttons}>
                                <button className={`${styles.button} ${styles.delete}`} onClick={() => onDelete(payment.id)}>
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination/>
        </div>
    )
}

export default PaymentsPage