"use client"

// import styles from "@/app/ui/dashboard/games/addGame/addGame.module.css";
import styles from '@/app/ui/dashboard/games/singleGame/singleGame.module.css'
import Image from "next/image";
import {useEffect, useState} from "react";
import {Field, Formik} from "formik";
import {navigate} from "@/app/dashboard/games/add/action";
import {toast} from 'react-hot-toast'
import AddOrUpdateGamePage from "@/app/dashboard/games/AddOrUpdateGamePage";

export default function AddGamePage() {
    return <AddOrUpdateGamePage
        isCreate={true}
    />
}