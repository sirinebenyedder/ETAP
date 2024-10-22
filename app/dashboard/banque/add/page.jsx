import styles from '../../../ui/dashboard/banque/banqueadd.module.css'
import { addBanque } from '../../../lib/actions';
import { auth } from "../../../auth";
const AddbanquePage = async () => { 
    const session = await auth ();

    console.log("session dans banque page",session);
    console.log("isAdmin::",session.user.isAdmin);
    if (session.user.isAdmin !== "admin") {console.log("access denied");
        return null;
    };
      
    return (  
        <div className={styles.container}>
        <form action={addBanque} className={styles.form}>
            <input type='text' placeholder='Nom  du banque' name='nom'/>
    
            <button type="submit" className={`${styles.button}`}>Valider</button>


        </form>

        </div>
    )
}

export default AddbanquePage;