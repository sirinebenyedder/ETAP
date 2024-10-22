"use client";
import React, { useState , useEffect } from 'react';
import styles from '../../../ui/dashboard/cheque/addCheque/addCheque.module.css';
import { addCheque } from '../../../lib/actions';
//import {fetchSelectedCompte} from '../../../lib/data';
//import { useMutation } from '@tanstack/react-query';
const FormComponent = ({ userID ,banques,comptes}) => {
    const [date, setDate] = useState();
    /*console.log(comptes);
    console.log("les id",comptes[0].nomBanque._id);
    console.log("ooo",comptes[0].nomBanque.nom);
    console.log(typeof comptes[0].nomBanque.nom);*/
    const [selectedBank, setSelectedBank] = useState('');
    

    // Handler for when the bank is changed
    const handleBankChange = (event) => {
        const bankId = event.target.value;
        setSelectedBank(bankId);
        console.log('hiii');
       
       /*const relatedComptes = comptes.find(compte => compte.nomBanque.nom === bankId);
        setFilteredComptes(relatedComptes);*/
  };
    
      
        

   return (
        <div className={styles.container}>
            <form action={addCheque} className={styles.form}>
                <input type='hidden' name="creepar" value={userID}/>

                <select name="type" id="type">
                    <option value="general" disabled hidden>type</option>
                    <option value="personnel">personnel</option>
                    <option value="fournisseur">fournisseur</option>
                    <option value="stagiaire">stagiaire</option>
                </select>
                
                <input type="number" placeholder='montant' name="montant"/> 
                <div className={styles.inputGroup}>
  <div className={styles.dateWrapper}>
                <label htmlFor="datevaleur" className={styles.label}>Date de valeur</label>
                  <input
                    type="date"
                    id="datevaleur"
                    name="datevaleur"
                    className={styles.dateInput}
                    onChange={e => setDate(e.target.value)}
                  />
                  </div></div>
                  <input type="text" name='beneficiary' className={styles.txtInput} placeholder='bénéficiaire'/>
                  <input type="text" placeholder="description" name='motif' />
                  
        <select name="idbanque" onChange={handleBankChange}>
          <option value="" >choisir une banque</option>
          {banques.map((banque) => (
            <option key={banque._id} value={banque._id} >{banque.nom}</option>
          ))}
        </select>
        

          <select name='idcompte'>
          <option value="" disabled hidden >Select Bank</option>
          {comptes.filter((compte) => {
            return selectedBank =='' ? null : compte.nomBanque._id.includes(selectedBank);
          } ).map((compte) => (
                        <option key={compte._id} value={compte._id} >{compte.num}</option>
                    ))}
                   
                </select> 
        
                <button type="submit" className={`${styles.button}`}>Valider</button>
                
            </form>
        </div>
    );
}

export default FormComponent;
