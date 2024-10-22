import { fetchCheque} from "../../../lib/data";
import styles from '../../../ui/dashboard/cheque/singleCheque/singleChequeEmi.module.css'
import {UpdateEntreeCaisse} from "../../../lib/actions"
import { auth } from "../../../auth";


const SingleEmiChequePage = async ({params})=>{
    const { id } = params ;
    const cheque = await fetchCheque(id);
    const { user } = await auth();
    const CaisseID = user.id;
    console.log("caisseid",CaisseID);
    return (<div className={styles.container}>
        
        <div className={styles.formContainer}>
        <form action={UpdateEntreeCaisse} className={styles.form}> 
        <input type='hidden' name="emipar" value={CaisseID}/>
        {CaisseID}
        <input type="hidden" name="id" value={cheque.id}/> 
            <label> titre du chèque : {cheque.title}</label>
            <br></br>
            <label>Banque : {cheque.idbanque.nom}</label>
            <br></br>
            <label>Compte : {cheque.idcompte.num} </label>
            <br></br>
            <labes>Etat du chèque : {cheque.etat}</labes>
        
            <br></br>
        
            <label>Montant : {cheque.montant}</label>
            
            <br></br>
            <label>Bénéficiaire : {cheque.beneficiary}</label>
            
            <br></br>
            <label>Description : {cheque.motif}</label>
            <br></br> 
            <label>Date Valeur : {cheque.datevaleur.toString().slice(4, 16)}</label>
            
    <div className={styles.formiContainer}>
    <div className={styles.inputGroup}>
        <label>Date Entree Caisse : {cheque.dateentreecaisse?.toString().slice(4, 16)}</label>
        <input type="date" name="dateentreecaisse" />
        <div className={styles.buttonContainer}>
            <button type="submit" name="action" value="updateEntreeCaisse" className={styles.button}>
                Entree Caisse
            </button>
        </div>
    </div>

    <div className={styles.inputGroup}>
        <label>Date Emission : {cheque.dateemission?.toString().slice(4, 16)}</label>
        <input type="date" name="dateemission" />
        <div className={styles.buttonContainer}>
            <button type="submit" name="action" value="updateDateEmission" className={styles.button}>
                Emission
            </button>
        </div>
    </div>
    </div>
        
        </form>
        </div>
        </div>
        
            );
        };

export default SingleEmiChequePage ;