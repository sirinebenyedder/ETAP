import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";
import { fetchTotal } from "../../../lib/data";

const Carda = async() => {
  const {actives , utilisateurs} = await fetchTotal();
  //console.log(utilisateurs);
  return (
    <div className={styles.container}>
     <MdSupervisedUserCircle size={24}/>
     <div className={styles.texts}>
      <span className={styles.title}>nombre total d'utilisateurs </span>
      <span className={styles.number}>{utilisateurs} utilisateurs</span>
     
     </div>
    </div>
  );
};

export default Carda;