"use client"
import styles from "@/app/ui/login/login.module.css";
import Link from 'next/link'
import { fetchUsers } from "../lib/userRepository";
import { useEffect, useState } from "react";

export default function LoginPage(){
  const [email, setEmail] = useState()
  const [password,setPassword] = useState()

  useEffect( () => {
    validate()
  }, [email,password]);

  async function handleSubmit(e){
    e.preventDefault();

    let res = await signIn("credentials", {
      email,
      password,
    })
  }
  
  return (
    <div className={styles.container}>
        <form action="" className={styles.form}>
            <h1>Login</h1>
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password" />
            <Link href="/dashboard">
              <button>Login</button>
            </Link>
            
        </form>
    </div>
  );
};

// "use client"
// import { useState } from 'react'
// // import { useRouter } from 'next/router'
// import styles from "@/app/ui/login/login.module.css";

// const LoginPage = () => {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const router = useState('')

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()

//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email, password })
//     })

//     if (response.ok) {
//       router.push('/dashboard')
//     } else {
//       alert('Invalid credentials')
//     }
//   }

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <h1>Login</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   )
// }

// export default LoginPage
