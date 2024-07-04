import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css"
import Link from "next/link";
import{
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
} from "react-icons/md";

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
                title:"Products",
                path:"/dashboard/products",
                icon: <MdShoppingBag />,
            },
            {
                title:"Transactions",
                path:"/dashboard/transactions",
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
const Sidebar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image className={styles.userImage} src="/noavatar.png" alt="" width="50" height="50"/>
                <div className={styles.userDetail}>
                    <span className={styles.username}>John Joe</span>
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
            <Link href="/login">
                <button className={styles.logout}>
                    <MdLogout />
                Logout</button>
            </Link>
        </div>
    );
};

export default Sidebar;