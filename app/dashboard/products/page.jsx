import Image from "next/image"
import Link from "next/link"
import styles from "@/app/ui/dashboard/products/products.module.css"
import Search from "@/app/ui/dashboard/search/search"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import { fetchGames } from "@/app/lib/data";

const ProductsPage = async () => {
    const games = await fetchGames();

    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a user..."/>
                <Link href="/dashboard/products/add">
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
                {games.map((game) => {
                    return <tr key = {game.id}>
                        <td>
                            <div className={styles.product}>
                                <Image
                                    src="/noproduct.jpg"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className={styles.productImage}
                                />
                            </div>
                        </td>
                        <td>{game.name}</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href="/dashboard/products/test">
                                    <button className={`${styles.button} ${styles.view}`}>
                                        View
                                    </button>
                                </Link>
                                <button className={`${styles.button} ${styles.delete}`}>
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
            <Pagination/>
        </div>
    )
}

export default ProductsPage