"use client"
import { Inter } from 'next/font/google'
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './ui/globals.css'
import {Toaster} from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Lama Dev Next.js Admin Dashboard',
//   description: 'Next.js Tutorial',
// }

export default function RootLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
