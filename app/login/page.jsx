import styles from "@/app/ui/login/login.module.css";
import Link from 'next/link'

const LoginPage = () => {
  return (
    <div className={styles.container}>
        <form action="" className={styles.form}>
            <h1>Login</h1>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <Link href="/dashboard">
              <button>Login</button>
            </Link>
            
        </form>
    </div>
  );
};

export default LoginPage;