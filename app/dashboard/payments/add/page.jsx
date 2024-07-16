"use client"

// import styles from "@/app/ui/dashboard/payments/addPayment/addPayment.module.css";
import styles from '@/app/ui/dashboard/payments/singlePayment/singlePayment.module.css'
import Image from "next/image";
import {useEffect, useState} from "react";
import {Field, Formik} from "formik";
import {navigate} from "@/app/dashboard/payments/add/action";
import {toast} from 'react-hot-toast'
import AddOrUpdatePaymentPage from "@/app/dashboard/payments/AddOrUpdatePaymentPage";

export default function AddPaymentPage() {
    return <AddOrUpdatePaymentPage
        isCreate={true}
    />
}