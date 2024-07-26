import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css"
import{
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
} from "react-icons/md";
import {auth, signOut} from "@/auth";
import {fetchUserByEmail} from "@/app/lib/UserRepository";

const menuItems =[
    {
        title:"Pages",
        list: [
            {
                title:"Dashboard",
                path:"/dashboard",
                icon: <MdDashboard />,
            },
            {
                title:"Users",
                path:"/dashboard/users",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title:"Games",
                path:"/dashboard/games",
                icon: <MdShoppingBag />,
            },
            {
                title:"Products",
                path:"/dashboard/products",
                icon: <MdShoppingBag />,
            },
            {
                title:"Payments",
                path:"/dashboard/payments",
                icon:<MdAttachMoney />,
            },
            {
                title:"Transactions",
                path:"/dashboard/orders",
                icon: <MdAttachMoney />,
            },
        ],
    },
    {
        title:"Users",
        list: [
            {
                title:"Settings",
                path:"/dashboard/settings",
                icon:<MdOutlineSettings />,
            },
            {
                title:"Help",
                path:"/dashboard/help",
                icon:<MdHelpCenter />,
            },
        ],
    },
];
const Sidebar = async () => {
    // TODO: James
    const session = await auth();
    const user = await fetchUserByEmail(session.user.email);

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src={user?.image_url ?? "/noavatar.png"} alt="" width="50" height="50"/>
                <div className={styles.userDetail}>
                    <span className={styles.username}>{session.user.name}</span>
                    <span className={styles.userTitle}>Administrator</span>
                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.map((cat) => (
                    <li key={cat.title}> 
                        <span className={styles.cat}>{cat.title}</span>
                        {cat.list.map((item) => (
                            <MenuLink item={item} key={item.title} />
                        ))}
                    </li>
                ))}
            </ul>
            <form action={async () => {
                'use server';
                await signOut({ redirectTo: "/login" });
            }}>
                <button className={styles.logout}>
                    <MdLogout/>
                    Logout
                </button>
            </form>
        </div>
    );
};

export default Sidebar;