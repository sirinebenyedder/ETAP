import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";
import { fetchEmi } from "../../../lib/data";

const Carda = async() => {
  const {emmi , cheques} = await fetchEmi();
  //console.log(emmi)
  return (
    <div className={styles.container}>
     <MdSupervisedUserCircle size={24}/>
     <div className={styles.texts}>
      <span className={styles.title}>nombre total des cheques </span>
      <span className={styles.number}>{cheques} cheques</span>
     
     </div>
    </div>
  );
};

export default Carda;