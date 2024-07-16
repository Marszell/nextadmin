"use client"

import Image from "next/image"
import Link from "next/link"
import styles from "@/app/ui/dashboard/users/users.module.css"
import Search from "@/app/ui/dashboard/search/search"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import {useEffect, useState} from "react";
import axios from "axios";

const UsersPage = () => {
    const [users, setUsers] = useState([])

    useEffect( () => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        const userRes = await axios.get("/api/users")
        setUsers(userRes.data.data)
    }

    const onDelete = async (id) => {
        await axios.delete(`/api/users/${id}`)
        await fetchUsers()
    }

    const onChange = async (event) => {
        const filteredUsers = await axios.get(`/api/users`, {
            params: {
                name: event.target.value,
            }
        });
        setUsers(filteredUsers.data.data)
    }

    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder="Search for a users..." onChange={onChange} />
                <Link href="/dashboard/users/add">
                    <button className={styles.addButton}>Add New</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Created At</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                {users !== undefined && users.map((user) => (
                    <tr key = {user.id}>
                        <td>
                            <div className={styles.product}>
                                <Image
                                    src={user.image_url}
                                    alt=""
                                    width={40}
                                    height={40}
                                    // className={styles.productImage}
                                />
                                {user.name}
                            </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.created_at}</td>
                        <td>
                            <div className={styles.buttons}>
                                <Link href={`/dashboard/users/${user.id}`}>
                                    <button className={`${styles.button} ${styles.view}`}>
                                        View
                                    </button>
                                </Link>
                                <button className={`${styles.button} ${styles.delete}`} onClick={() => onDelete(user.id)}>
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

export default UsersPage