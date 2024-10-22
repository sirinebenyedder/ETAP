import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";
import { fetchEmi } from "../../../lib/data";

const Cardi = async() => {
  const {emmi , cheques} = await fetchEmi();
  //console.log(emmi)
  return (
    <div className={styles.container}> 
     <MdSupervisedUserCircle size={24}/>
     <div className={styles.texts}>
      <span className={styles.title}>les cheques emmi </span>
      <span className={styles.number}>{emmi} cheques emis</span>
     
     </div>
    </div>
  );
};

export default Cardi;