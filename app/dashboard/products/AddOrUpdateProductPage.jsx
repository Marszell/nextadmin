"use client"

// import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";
import styles from '@/app/ui/dashboard/products/singleProduct/singleProduct.module.css'
import Image from "next/image";
import {useEffect, useState} from "react";
import {Field, Formik} from "formik";
import {navigate} from "@/app/dashboard/products/add/action";
import {LoaderIcon, toast} from 'react-hot-toast'
import axios from "axios";

export default function AddOrUpdateProductPage({ isCreate, id }) {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState("/noavatar.png")
    const [formData, setFormData] = useState({})
    const [games, setGames] = useState([])

    useEffect(() => {
        fetchGames()
        fetchProduct()

        if (!selectedFile) {
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile]);

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

    const fetchProduct = async () => {
        if (!id) return
        const data = await axios.get(`/api/products/${id}`)
        setFormData({
            name: data.data.data.name,
            description: data.data.data.description,
            image_url: data.data.data.image_url,
            price: data.data.data.price,
            quantity: data.data.data.quantity,
            game_id: data.data.data.game_id,
        })
        // const objectUrl = URL.createObjectURL(imageUrl)
        if (!selectedFile) {
            setPreview(data.data.data.image_url)
        }
    }

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
    }

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            for (let value in values) {
                formData.append(value, values[value])
            }
            formData.append("file", selectedFile)
            let response;
            if (!isCreate) {
                response = await axios.put(`/api/products/${id}`, formData)
            } else {
                response = await axios.post("/api/products", formData)
            }
            if (response.status === 201 || response.status === 200) {
                navigate("/dashboard/products")
                toast.success("Berhasil")
            } else {
                // throw(new Error("duar"))
                toast.error("Error")
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const initialValues = {
        name: formData["name"] ?? "",
        game_id: formData["game_id"] ?? games[0]?.id,
        price: formData["price"] ?? "",
        quantity: formData["quantity"] ?? "",
        description: formData["description"] ?? "",
        image_url: formData["image_url"] ?? "",
    }

    if (!isCreate && Object.keys(formData).length === 0) return <LoaderIcon />

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {({
                handleSubmit,
            }) => (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.container}>
                        <div className={styles.infoContainer}>
                            <div className={styles.imgContainer}>
                                <Image src={preview} alt="" fill/>
                            </div>
                            <input type="file" name="file" onChange={onSelectFile}/>
                        </div>
                        <div className={styles.formContainer}>
                            <label>Name</label>
                            <Field type="text" name="name" placeholder="Product Name"/>
                            <label>Name Game</label>
                            <Field name="game_id" placeholder="Name Game" as="select">
                                {games.map(game => {
                                    return <option value={game.id}>{game.name}</option>
                                })}
                                {/* {games.map(game => `<option value=${game.id}>${game.name}</option>`)} */}
                                {/* <option value="genshin">Genshin</option>
                                <option value="hsr">HSR</option> */}
                            </Field>
                            <label>Price</label>
                            <Field type="number" name="price" placeholder="Price"/>
                            <label>Quantity</label>
                            <Field type="number" name="quantity" placeholder="Quantity"/>
                            <label>Description</label>
                            <Field type="text" name="description" placeholder="Description"
                                   as="textarea" rows={1}/>
                            <button type="submit">Update</button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}