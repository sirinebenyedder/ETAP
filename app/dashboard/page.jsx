import Card from "../ui/dashboard/card/card"
import styles from "../ui/dashboard/dashboard.module.css";

import Carda from "../ui/dashboard/card/carda"
import Cardo from "../ui/dashboard/card/cardo"
import Cardi from "../ui/dashboard/card/cardi"
import RoundChart from "../ui/dashboard/chart/RoundChart";
const Dashboard = () => {
    return (<div className={styles.wrapper}>
        <div className={styles.main}>
        <div className={styles.cards}>
            <Carda/>
            
            <Card/>
            </div>
            <div className={styles.cards}>
            <Cardo/>
            <Cardi/>
            </div>
            <div className={styles.roundchart}>
            
            </div>
            </div>
           
            </div>
    )
}
export default Dashboard