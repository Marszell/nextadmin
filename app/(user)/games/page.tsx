"use client"
import React, { useState } from 'react';
import Sidebar from "./sidebarproduct/sidebarproduct";
import styles from './product.module.css';
import Item from "./item/item";
import Payment from './payment/payment';

export default function Games() {
    const [selectedItem, setSelectedItem] = useState(null);

    const [selectedPayment,setSelectedPayment] = useState(null);

    const handleItemClick = (index) => {
        setSelectedItem(index);
    };

    const handlePaymentClick = (index) => {
        setSelectedPayment(index);
    };

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.content}>
                <div className={styles.box}>
                    <span>UID</span>
                    <input type="text" />
                </div>
                <div className={styles.box}>
                    <span>Product</span>
                    <div className={styles.item}>
                        {[...Array(7)].map((_, index) => (
                            <Item
                                key={index}
                                onClick={() => handleItemClick(index)}
                                isSelected={selectedItem === index}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.payment}>
                    <span>Payment</span>
                    {[...Array(7)].map((_, index) => (
                        <Payment
                                key={index}
                                onClick={() => handlePaymentClick(index)}
                                isSelected={selectedPayment === index}
                            />
                    ))}
                </div>
                <div className={styles.email}>
                    <span>Email (optional)</span>
                    <input type="text" />
                        <button className={styles.button}>Beli Sekarang</button>
                </div>
            </div>
        </div>
    );
}
