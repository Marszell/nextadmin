"use client"

import Image from "next/image"
import Link from "next/link"
import styles from "@/app/ui/dashboard/products/products.module.css"
import Search from "@/app/ui/dashboard/search/search"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import {useEffect, useState} from "react";
import axios from "axios";

const ProductsPage = () => {
    const [products, setProducts] = useState([])

    useEffect( () => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const productRes = await axios.get("/api/products")
        setProducts(productRes.data.data)
    }

    const onDelete = async (id) => {
        await axios.delete(`/api/products/${id}`)
        await fetchProducts()
    }

    const onChange = async (event) => {
        const filteredProducts = await axios.get(`/api/products`, {
            params: {
                name: event.target.value,
            }
        });
        setProducts(filteredProducts.data.data)
    }

    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a products..." onChange={onChange} />
                <Link href="/dashboard/products/add">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Logo</td>
                        <td>Name Product</td>
                        <td>Name Game</td>
                        <td>Description</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                {products !== undefined && products.map((product) => (
                    <tr key = {product.id}>
                        <td>
                            <div className={styles.product}>
                                <Image
                                    src={product.image_url}
                                    alt=""
                                    width={40}
                                    height={40}
                                />
                            </div>
                        </td>
                        <td>{product.name}</td>
                        <td>{product.game_name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href={`/dashboard/products/${product.id}`}>
                                    <button className={`${styles.button} ${styles.view}`}>
                                        View
                                    </button>
                                </Link>
                                <button className={`${styles.button} ${styles.delete}`} onClick={() => onDelete(product.id)}>
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

export default ProductsPage