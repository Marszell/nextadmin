"use client"
import { useState } from 'react';
import styles from '@/app/ui/login/login.module.css';
import {useActionState} from "react";
import axios from "axios";
import {authenticate} from "@/app/lib/action";
import {navigate} from "@/app/dashboard/games/add/action";
import {useRouter} from "next/navigation";
import {toast, Toaster} from "react-hot-toast";

export default function LoginPage() {
  // const [errorMessage, formAction, isPending] = useActionState(
  //     authenticate,
  //     // searchParams.get("callbackUrl")
  //     undefined,
  // );
  const router = useRouter()

  const login =  async (values) => {
    try {
      const response = await axios.post("/api/auth/login", values)
      console.log(response);
      if (response.status === 200) {
        router.replace("/dashboard");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className={styles.container}>
      <Toaster position={"bottom-left"}/>
      <form action={login} className={styles.form}>
        <h1>Login</h1>
        <input 
          type="email"
          name="email"
          placeholder="Email"
          required 
        />
        <input 
          type="password"
          name="password"
          placeholder="Password"
          required 
        />
        <button>Login</button>
      </form>
    </div>
  );
}