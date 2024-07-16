"use client"

// import styles from "@/app/ui/dashboard/games/addGame/addGame.module.css";
import styles from '@/app/ui/dashboard/games/singleGame/singleGame.module.css'
import Image from "next/image";
import {useEffect, useState} from "react";
import {Field, Formik} from "formik";
import {navigate} from "@/app/dashboard/games/add/action";
import {LoaderIcon, toast} from 'react-hot-toast'
import axios from "axios";

export default function AddOrUpdateGamePage({ isCreate, id }) {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState("/noavatar.png")
    const [formData, setFormData] = useState({})

    useEffect(() => {
        fetchGame()

        if (!selectedFile) {
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile]);

    const fetchGame = async () => {
        if (!id) return
        const data = await axios.get(`/api/games/${id}`)
        setFormData({
            name: data.data.data.name,
            description: data.data.data.description,
            image_url: data.data.data.image_url,
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
                response = await axios.put(`/api/games/${id}`, formData)
            } else {
                response = await axios.post("/api/games", formData)
            }

            if (response.status === 201 || response.status === 200) {
                navigate("/dashboard/games")
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
                            <Field type="text" name="name" placeholder="Game Name"/>
                            <label>Description</label>
                            <Field type="text" name="description" placeholder="Description"
                                   as="textarea" rows={10}/>
                            <button type="submit">Update</button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}