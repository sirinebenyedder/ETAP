import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";
import { fetchTotal } from "../../../lib/data";

const Card = async() => {
  const {actives , utilisateurs} = await fetchTotal();
  //console.log(utilisateurs);
  return (
    <div className={styles.container}>
     <MdSupervisedUserCircle size={24}/>
     <div className={styles.texts}>
      <span className={styles.title}>nombre d'utilisateurs actifs</span>
      <span className={styles.number}>{actives} utilisateurs activs</span>
      <span className={styles.detail}>
        <span className={styles.positive}>{actives * 100 / utilisateurs}%</span>
        <span>du nombre total des utilisateurs</span></span>
     </div>
    </div>
  );  
};

export default Card;