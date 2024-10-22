"use client";

  
import styles from "./addUser.module.css";  
import { useFormState } from "react-dom";  
import { addUser } from "../../../../lib/actions"; 

const AddUserForm = () => { 
  const [state, formAction ] = useFormState(addUser, undefined);

  return (
    
        <form action={formAction} className={styles.form}>
            <input type='text' placeholder='username' name='username' required />
            <input type='email' placeholder='email' name='email' required/>
            <input type='password' placeholder='mot de passe' name='password' required />
            <select name="isAdmin" id="isAdmin">
            <option value="" disabled selected>rôle</option>
                <option value="admin">admin</option>
                <option value="caissier">caissier</option>
                <option value="agent">agent</option>
            </select>
            <select name="isActive" id="isActive">
                <option value={true}>Actif?</option>
                <option value={true}>activ</option>
                <option value={false}>non activ</option>
            </select>

            <button type="submit" className={`${styles.button}`}>Valider</button>
            <div style={{ textAlign: 'center', color: 'red' ,paddingTop: '20px'}}>
                {state && state}
            </div>
        </form>
    
  );
  //state binisba lina hiya l'erreur tkoun undefined mi louel w ba3id twali feha l'erreur
};

export default AddUserForm;