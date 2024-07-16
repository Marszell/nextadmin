"use client"

// import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import styles from '@/app/ui/dashboard/users/singleUser/singleUser.module.css'
import Image from "next/image";
import {useEffect, useState} from "react";
import {Field, Formik} from "formik";
import {navigate} from "@/app/dashboard/users/add/action";
import {LoaderIcon, toast} from 'react-hot-toast'
import axios from "axios";

export default function AddOrUpdateUserPage({ isCreate, id }) {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState("/noavatar.png")
    const [formData, setFormData] = useState({})

    useEffect(() => {
        fetchUser()

        if (!selectedFile) {
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile]);

    const fetchUser = async () => {
        if (!id) return
        const data = await axios.get(`/api/users/${id}`)
        setFormData({
            name: data.data.data.name,
            email: data.data.data.email,
            // created_at: data.data.data.created_at,
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
                response = await axios.put(`/api/users/${id}`, formData)
            } else {
                response = await axios.post("/api/users", formData)
            }

            if (response.status === 201 || response.status === 200) {
                navigate("/dashboard/users")
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
        email: formData["email"] ?? "",
        // created_at: formData["created_at"] ?? "",
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
                            <Field type="text" name="name" placeholder="User Name"/>
                            <label>Email</label>
                            <Field type="email" name="email" placeholder="Email"/>
                            <label>Password</label>
                            <Field type="password" name="password" placeholder="Password"/>
                            <button type="submit">Update</button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}