"use client"
import Link from 'next/link'
import Card from './card/card'
import Carousel from './carousel/carousel'
import styles from './dashboard.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function Dashboard(){
    const [games, setGames] = useState([])

    useEffect( () => {
        fetchGames()
    }, [])
    const fetchGames = async () => {
        const gameRes = await axios.get("/api/games")
        setGames (gameRes.data.data)
    }

    // useEffect (() => {
    //     const fetchGames = async () => {
    //         try {
    //             const response = await fetch("/api/games")
    //             const result = await response.json();
    //             setGames(result.data);
    //         } catch (error) {
    //             console.error('error fetching games:',error);
    //         }
    //     };

    //     fetchGames();
    // },[]);

    return(
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.carousel}>
                    <Carousel />
                </div>
                <div className={styles.content}>
                    <div className={styles.title}>
                        <span>Top Games</span>
                    </div>
                    {games.map((game) => (
                        <Link key ={game.id} className={styles.game} href={`/product/${game.id}`}>
                            <Card name={game.name} imageUrl={game.image_url}/>
                        </Link>
                        ))}
                </div>
            </div>
        </div>
    )
}