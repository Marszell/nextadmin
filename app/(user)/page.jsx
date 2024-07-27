"use client"
import Link from 'next/link'
import Card from './card/card'
import Carousel from './carousel/carousel'
import styles from './dashboard.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

//this is a dashboard of user page
export default function Dashboard(){
    const [games, setGames] = useState([])

    useEffect( () => {
        fetchGames()
    }, [])
    const fetchGames = async () => {
        const gameRes = await axios.get("/api/games")
        setGames(gameRes.data.data)
    }
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
                    <div className={styles.game_container}>
                        {games.map((game) => (
                            <Link key ={game.id} className={styles.game} href={`/games/${game.id}`}>
                                <Card name={game.name} imageUrl={game.image_url}/>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}