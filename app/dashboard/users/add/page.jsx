"use client"

// import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import styles from '@/app/ui/dashboard/users/singleUser/singleUser.module.css'
import Image from "next/image";
import {useEffect, useState} from "react";
import {Field, Formik} from "formik";
import {navigate} from "@/app/dashboard/users/add/action";
import {toast} from 'react-hot-toast'
import AddOrUpdateUserPage from "@/app/dashboard/users/AddOrUpdateUserPage";

export default function AddUserPage() {
    return <AddOrUpdateUserPage
        isCreate={true}
    />
}