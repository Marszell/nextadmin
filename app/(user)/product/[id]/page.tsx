"use client"
import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebarproduct/sidebarproduct';
import styles from '../product.module.css';
import Item from "../item/item";
import Payment from '../payment/payment';
import axios from 'axios';
import { fetchProductsById } from '@/app/lib/productRepository';

export default function Product() {
    const [games,setGames] = useState([])
    const [products,setProducts] = useState([])
    const [payments,setPayments] = useState([])

    useEffect (() => {
        fetchProductsById()
        fetchPayments()
        fetchGames()
    }, [])

    const fetchGames = async () => {
        const data = await axios.get("/api/games")
        const tempGames = data.data.data.map(game => {
            return {
                "id": game.id,
                "name": game.name,
            }
        })
        setGames(tempGames)
    }

    const fetchProductsById = async () => {
        const productRep = await axios.get("/api/products")
        setProducts(productRep.data.data)
    }

    const filtered = products .filter(product => product.game_id === games.id);

    const fetchPayments = async () => {
        const paymentRep = await axios.get("/api/payments")
        setPayments(paymentRep.data.data)
    }
    
    // const filteredProducts = products.filter(product => product.game_id === selectedGame);

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
                        {products.map((product, index) => (
                            <Item 
                            key={index}
                            name={product.name}
                            imageUrl={product.image_url}
                            desc={product.description}
                            price={product.price}
                            onClick={() => handleItemClick(index)}
                            isSelected={selectedItem === index}
                            />
                        ))} 
                        
                        {/* {[...Array(7)].map((_, index) => (
                            <Item
                                key={index}
                                onClick={() => handleItemClick(index)}
                                isSelected={selectedItem === index}
                            />
                        ))} */}
                    </div>
                </div>
                <div className={styles.payment}>
                    <span>Payment</span>
                    {payments.map((payment, index) => (
                        <Payment
                        key={index}
                        name={payment.name}
                        imageUrl={payment.image_url}
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