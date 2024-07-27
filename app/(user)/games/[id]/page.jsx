"use client"
import React, {useEffect, useRef, useState} from 'react';
import Sidebar from '../sidebarproduct/sidebarproduct';
import styles from '../product.module.css';
import Item from "../item/item";
import Payment from '../payment/payment';
import axios from 'axios';
import { fetchProductsById } from '@/app/lib/ProductRepository';
import {useParams, useRouter} from "next/navigation";
import {Field, Formik} from "formik";
import {navigate} from "@/app/dashboard/games/add/action";
import {toast} from "react-hot-toast";
import * as Yup from "yup";

//this function is for show the product of game
export default function GameDetail() {
    const params = useParams();
    const game_id = params.id;
    const [game,setGame] = useState({})
    const formRef = useRef();
    const [products,setProducts] = useState([])
    const [payments,setPayments] = useState([])
    const [selectedProductIndex,setSelectedProductIndex] = useState(null)
    const [selectedPaymentIndex,setSelectedPaymentIndex] = useState(null)

    useEffect (() => {
        fetchProductsById(game_id)
        fetchPayments()
        fetchGame()
    }, [])

    const fetchGame = async () => {
        const response = await axios.get(`/api/games/${game_id}`)
        setGame(response.data.data)
    }

    const fetchProductsById = async (id) => {
        const productRep = await axios.get("/api/products", {
            params: {
                game_id: id,
            }
        })
        setProducts(productRep.data.data)
    }

    const fetchPayments = async () => {
        const paymentRep = await axios.get("/api/payments")
        setPayments(paymentRep.data.data)
    }

    const onSubmit = async (values) => {
        try {
            const response = await axios.post("/api/orders", values);
            if (response.status === 201) {
                toast.success("Berhasil");
                formRef.current?.resetForm();
                setSelectedPaymentIndex(null);
                setSelectedProductIndex(null);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const CreateTransactionSchema = Yup.object().shape({
        uid: Yup.string().required("Please fill UID field"),
        product_id: Yup.number().required("Please fill Product field"),
        payment_id: Yup.number().required("Please fill Payment field"),
        email: Yup.string().email("Please enter a valid email address"),
    })

    const initialValues = {
        uid: "",
        product_id: "",
        payment_id: "",
    }

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar
                    name={game.name}
                    image_url={game.image_url}
                    description={game.description}
                />
            </div>
            <div className={styles.content}>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    innerRef={formRef}
                    onSubmit={onSubmit}
                    validationSchema={CreateTransactionSchema}
                >
                    {({
                          handleSubmit,
                          errors,
                          touched,
                          setFieldValue,
                          resetForm,
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <div className={styles.box}>
                                <span>UID</span>
                                <Field type="text" name="uid" placeholder="UID"/>
                                {errors.uid && touched.uid ? (
                                    <div className="text-bg-danger border border-red-400 text-red-700 px-4 py-2 rounded relative"
                                         role="alert">
                                        <strong className="font-bold">{errors.uid}</strong>
                                    </div>
                                ) : null}
                            </div>
                            <div className={styles.box}>
                                <span>Product</span>
                                <div className={styles.item}>
                                    {products.map((product, index) => (
                                        <Item
                                            key={index}
                                            label={product.name}
                                            name={'product_id'}
                                            imageUrl={product.image_url}
                                            desc={product.description}
                                            price={product.price}
                                            onClick={() => {
                                                setFieldValue("product_id", product.id)
                                                setSelectedProductIndex(index)
                                            }}
                                            isDisabled={product.quantity <= 0}
                                            isSelected={selectedProductIndex === index}
                                        />
                                    ))}
                                </div>
                            </div>
                            {errors.product_id && touched.product_id ? (
                                <div className="text-bg-danger border border-red-400 text-red-700 px-4 py-2 rounded relative"
                                     role="alert">
                                    <strong className="font-bold">{errors.product_id}</strong>
                                </div>
                            ) : null}
                            <div className={styles.payment}>
                                <span>Payment</span>
                                {payments.map((payment, index) => (
                                    <Payment
                                        key={index}
                                        name={'payment_id'}
                                        label={payment.name}
                                        imageUrl={payment.image_url}
                                        onClick={() => {
                                            setFieldValue('payment_id', payment.id)
                                            setSelectedPaymentIndex(index)
                                        }}
                                        isSelected={selectedPaymentIndex === index}
                                    />
                                ))}
                            </div>
                            {errors.payment_id && touched.payment_id ? (
                                <div className="text-bg-danger border border-red-400 text-red-700 px-4 py-2 rounded relative"
                                     role="alert">
                                    <strong className="font-bold">{errors.payment_id}</strong>
                                </div>
                            ) : null}
                            <div className={styles.email}>
                                <span>Email (optional)</span>
                                <Field type="text" name="email" placeholder="Email"/>
                                {errors.email && touched.email ? (
                                    <div className="text-bg-danger border border-red-400 text-red-700 px-4 py-2 rounded relative"
                                         role="alert">
                                        <strong className="font-bold">{errors.email}</strong>
                                    </div>
                                ) : null}
                            </div>
                            <button type="submit" className={styles.button}>Beli Sekarang</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}