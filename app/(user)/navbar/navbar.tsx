"use client"
import {useRouter} from 'next/navigation'
import styles from './navbar.module.css'
import {MdSearch} from 'react-icons/md'
import Link from 'next/link'
import Select from "react-select";
import {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image";

export default function Navbar () {
    const router = useRouter();
    const [selectGame, setSelectedGame] = useState(null);
    const [games, setGames] = useState([])

    useEffect( () => {
        fetchGames()
    }, [])
    const fetchGames = async () => {
        const gameRes = await axios.get("/api/games")
        setGames(gameRes.data.data)
    }

    function handleChange(e){
        setSelectedGame(null);
        router.push(`/games/${e.value}`);
    }

    const options = games.map(game => (
        {
            value: game.id,
            label: game.name,
            image: game.image_url,
        }
    ))

    return(
        <div className={styles.container}>
            <div className={styles.left}>
                <Link href='../'>
                    <div className={styles.title}>VFun</div>
                </Link>
            </div>
            <div className={styles.center}>
                <div className={styles.search}>
                    <MdSearch/>
                    <Select
                        options={options}
                        className={styles.input}
                        value={selectGame}
                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                        styles={{
                            control: (base, state) => ({
                                ...base,
                                background: 'transparent',
                                border: 'none',
                                boxShadow: 'none',
                            }),
                            option: (styles, state) => ({
                                ...styles,
                                background: '#2e374a',
                            }),
                            placeholder: (styles, state) => ({
                                ...styles,
                                color: 'white',
                            }),
                            input: (styles, state) => ({
                                ...styles,
                                color: 'white',
                            })
                        }}
                        onChange={handleChange}
                        formatOptionLabel={data => (
                            <div key={data.value} className={styles.options}>
                                <Image src={data.image } alt="game-image" width={40} height={40}/>
                                <span className={"mx-2 text-white"}>{data.label}</span>
                            </div>
                        )}
                    />
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.icons}>
                    {/*<MdOutlineChat size={20} />*/}
                    {/*<MdNotifications size={20} />*/}
                </div>
            </div>
        </div>
    )
}