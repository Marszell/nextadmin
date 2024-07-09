"use client"

// import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";
import styles from '@/app/ui/dashboard/products/singleProduct/singleProduct.module.css'
import Image from "next/image";
import {useEffect, useState} from "react";
import {Field, Formik} from "formik";
import {navigate} from "@/app/dashboard/products/add/action";
import {toast} from 'react-hot-toast'
import AddOrUpdateProductPage from "@/app/dashboard/products/AddOrUpdateProductPage";

export default function AddProductPage() {
    return <AddOrUpdateProductPage
        isCreate={true}
    />

    // const [selectedFile, setSelectedFile] = useState()
    // const [preview, setPreview] = useState("/noavatar.png")
    //
    // useEffect(() => {
    //     if (!selectedFile) {
    //         // setPreview(undefined)
    //         return
    //     }
    //
    //     const objectUrl = URL.createObjectURL(selectedFile)
    //     setPreview(objectUrl)
    //
    //     // free memory when ever this component is unmounted
    //     return () => URL.revokeObjectURL(objectUrl)
    // }, [selectedFile]);
    //
    // const onSelectFile = e => {
    //     if (!e.target.files || e.target.files.length === 0) {
    //         setSelectedFile(undefined)
    //         return
    //     }
    //
    //     // I've kept this example simple by using the first image instead of multiple
    //     setSelectedFile(e.target.files[0])
    // }
    //
    // const onSubmit = async (values) => {
    //     const formData = new FormData();
    //     for (let value in values) {
    //         formData.append(value, values[value])
    //     }
    //     formData.append("file", selectedFile)
    //     const response = await fetch('/api/games', {
    //         method: 'POST',
    //         body: formData,
    //     })
    //
    //     const data = await response.json()
    //     if (data.status === 201) {
    //         navigate("/dashboard/products")
    //         toast.success("Berhasil")
    //     } else {
    //         // throw(new Error("duar"))
    //         toast.error("Error")
    //     }
    // }
    //
    // const initialValues = {
    //     name: name,
    //     description: description,
    // }
    // return (
    //     <Formik
    //         enableReinitialize={true}
    //         initialValues={initialValues}
    //         onSubmit={onSubmit}
    //     >
    //         {({
    //             handleSubmit,
    //         }) => (
    //             <form className={styles.form} onSubmit={handleSubmit}>
    //                 <div className={styles.container}>
    //                     <div className={styles.infoContainer}>
    //                         <div className={styles.imgContainer}>
    //                             {/*<Image src="/noavatar.png" alt="" fill/>*/}
    //                             <Image src={preview} alt="" fill/>
    //                         </div>
    //                         {/*IPhone*/}
    //                         <input type="file" name="file" onChange={onSelectFile}/>
    //                     </div>
    //                     <div className={styles.formContainer}>
    //                         {/*<form action="" className={styles.form} onSubmit={onSubmit}>*/}
    //                         {/*    <label>Name</label>*/}
    //                         {/*    <input type="text" name="title" placeholder="Game Name"/>*/}
    //                         {/*    <label>Description</label>*/}
    //                         {/*    <textarea*/}
    //                         {/*        name="desc"*/}
    //                         {/*        id="desc"*/}
    //                         {/*        rows="10"*/}
    //                         {/*        placeholder='description'*/}
    //                         {/*    ></textarea>*/}
    //                         {/*    <button>Update</button>*/}
    //                         {/*</form>*/}
    //                         <label>Name</label>
    //                         <Field type="text" name="name" placeholder="Game Name"/>
    //                         <label>Description</label>
    //                         <Field type="text" name="description" placeholder="Description"
    //                                as="textarea" rows={10}/>
    //                         <button type="submit">Update</button>
    //                     </div>
    //                 </div>
    //             </form>
    //         )}
    //     </Formik>
    // )
}