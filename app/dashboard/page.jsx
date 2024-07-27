import Card from "@/app/ui/dashboard/card/card"
import Chart from "@/app/ui/dashboard/chart/chart";
import styles from "@/app/ui/dashboard/dashboard.module.css"
import Transactions from "@/app/ui/dashboard/transactions/mainmenu/transactions";
import {countOrders, fetchOrders, fetchOrdersV2} from "@/app/lib/OrderRepository";
import {countGames} from "@/app/lib/GameRepository";
import {countProducts} from "@/app/lib/ProductRepository";

const Dashboard = async () => {
    const [orderQty, gameQty, productQty, orders] = await Promise.all([
        countOrders(),
        countGames(),
        countProducts(),
        fetchOrdersV2(),
    ]);


    return(
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    <Card label={'Order'} quantity={orderQty} />
                    <Card label={'Game'} quantity={gameQty} />
                    <Card label={'Product'} quantity={productQty} />
                </div>
                <Transactions
                orders ={orders}
                />
                <Chart/>
            </div>
        </div>
    );
};

export default Dashboard;