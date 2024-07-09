"use client"

import Image from "next/image"
import Link from "next/link"
import styles from "@/app/ui/dashboard/products/products.module.css"
import Search from "@/app/ui/dashboard/search/search"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import {useEffect, useState} from "react";
import axios from "axios";

const ProductsPage = () => {
    const [games, setGames] = useState([])

    useEffect( () => {
        fetchGames()
    }, [])

    const fetchGames = async () => {
        const gameRes = await axios.get("/api/games")
        setGames(gameRes.data.data)
    }

    const onDelete = async (id) => {
        await axios.delete(`/api/games/${id}`)
        await fetchGames()
    }

    const onChange = async (event) => {
        const filteredGames = await axios.get(`/api/games`, {
            params: {
                name: event.target.value,
            }
        });
        setGames(filteredGames.data.data)
    }

    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a games..." onChange={onChange} />
                <Link href="/dashboard/products/add">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Logo</td>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                {games !== undefined && games.map((game) => (
                    <tr key = {game.id}>
                        <td>
                            <div className={styles.product}>
                                <Image
                                    src={game.image_url}
                                    alt=""
                                    width={40}
                                    height={40}
                                    // className={styles.productImage}
                                />
                            </div>
                        </td>
                        <td>{game.name}</td>
                        <td>{game.description}</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href={`/dashboard/products/${game.id}`}>
                                    <button className={`${styles.button} ${styles.view}`}>
                                        View
                                    </button>
                                </Link>
                                <button className={`${styles.button} ${styles.delete}`} onClick={() => onDelete(game.id)}>
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