import styles from '../../../ui/dashboard/compte/compteadd.module.css'
import { addCompte } from '../../../lib/actions';
import { fetchSelection } from '../../../lib/data';
import { auth } from "../../../auth";
const AddcomptePage = async() => {
  const banques = await fetchSelection ();
    console.log(banques);

    const session = await auth ();

    console.log("session dans compte add page",session);
    console.log("isAdmin::",session.user.isAdmin);
    if (session.user.isAdmin !== "admin") {console.log("access denied");
        return null;
    };

    
    return (  
        <div className={styles.container}>
        <form action={addCompte} className={styles.form}>
            <input type='text' placeholder='Num du compte' name='num'/>
            <select name="nomBanque" >
      {banques.map((banque) => (
        <option key={banque.id} value={banque.id}>
          {banque.nom}
        </option>
      ))}
    </select>
            <button type="submit" className={`${styles.button}`}>Valider</button>


        </form>

        </div>
    )
}

export default AddcomptePage;