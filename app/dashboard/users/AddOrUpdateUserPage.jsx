"use client"

import styles from '@/app/ui/dashboard/users/singleUser/singleUser.module.css'
import Image from "next/image";
import {useEffect, useState} from "react";
import {Field, Formik} from "formik";
import {navigate} from "@/app/dashboard/users/add/action";
import {LoaderIcon, toast} from 'react-hot-toast'
import axios from "axios";
import * as Yup from "yup";

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
            image_url: data.data.data.image_url,
        })
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
                toast.error("Error")
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const initialValues = {
        name: formData["name"] ?? "",
        email: formData["email"] ?? "",
        password: "",
        image_url: formData["image_url"] ?? "",
    }

    const AddOrUpdateSchema = Yup.object().shape({
        name: Yup.string().required("Please fill name field"),
        email: Yup.string().required("Please fill email field").email("Please enter a valid email address"),
        password: Yup.string().required("Please fill password field").min(6, "Password must be at least 6 characters"),
    })

    if (!isCreate && Object.keys(formData).length === 0) return <LoaderIcon />

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={AddOrUpdateSchema}
        >
            {({
                handleSubmit,
                errors,
                touched,
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
                            {errors.name && touched.name ? (
                                <div class="text-bg-danger border border-red-400 text-red-700 px-4 py-2 rounded relative"
                                     role="alert">
                                    <strong class="font-bold">{errors.name}</strong>
                                </div>
                            ) : null}
                            <label>Email</label>
                            <Field type="email" name="email" placeholder="Email"/>
                            {errors.email && touched.email ? (
                                <div class="text-bg-danger border border-red-400 text-red-700 px-4 py-2 rounded relative"
                                     role="alert">
                                    <strong class="font-bold">{errors.email}</strong>
                                </div>
                            ) : null}
                            <label>Password</label>
                            <Field type="password" name="password" placeholder="Password"/>
                            {errors.password && touched.password ? (
                                <div class="text-bg-danger border border-red-400 text-red-700 px-4 py-2 rounded relative"
                                     role="alert">
                                    <strong class="font-bold">{errors.password}</strong>
                                </div>
                            ) : null}
                            <button type="submit">{isCreate ? "Add" : "Update"}</button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}