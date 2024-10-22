import { fetchCheque , fetchName } from '../../../lib/data';
import styles from'../../../ui/dashboard/cheque/singleCheque/singleCheque.module.css';

import {updateCheque} from "../../../lib/actions"

const SingleChequePage= async ({params})=>{
    const { id } = params ;    
    const cheque = await fetchCheque(id) ; 
    const userID = cheque.creepar 
    const name= await fetchName (userID);
    console.log("id",cheque);
    //console.log(cheque.creepar);  

    return (
<div className={styles.container}>
        
<div className={styles.formContainer}>
<form action={updateCheque} className={styles.form}> 
<input type="hidden" name="id" value={cheque.id}/> 
    <label> titre du chèque : {cheque.title}</label>
    <label>Banque : {cheque.idbanque.nom}</label>
    <label>Compte : {cheque.idcompte.num} </label>
    <label>cree par : {name}</label>
    <labes>Etat du chèque : {cheque.etat}</labes>
    <label>Emis par : {cheque.emipar?.username}</label>
    <label>Date entrée caisse : {cheque.dateentreecaisse?.toString().slice(4, 16)}</label>
    <label>Date Emission : {cheque.dateemission?.toString().slice(4, 16)}</label>

    <br></br>

    <label>Montant</label>
    <input type="number" name="montant" placeholder={cheque.montant}/>

    <label>Bénéficiaire</label>
    <input type="text" name="beneficiary" placeholder={cheque.beneficiary}/>

    <label>Description</label>
    <input type="text" name="motif" placeholder={cheque.motif}/>
    <label>Date Valeur : {cheque.datevaleur.toString().slice(4, 16)}</label>
    <input type='date' name='datevaleur' placeholder={cheque.datevaleur.toString().slice(4, 16)}/>
    
    {cheque.etat === 'en cours' && (
    <button className={styles.button}>
        mise à jour
    </button>
)}


</form>
</div>
</div>

    );
};
export default SingleChequePage