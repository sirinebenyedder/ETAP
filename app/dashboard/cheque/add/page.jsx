import React from 'react';
import { auth } from "../../../auth";
import FormComponent from '../../../ui/dashboard/chequeform/chequeform'; 
import { fetchSelectedCompte } from '../../../lib/data';
const AddChequePage = async () => { 
    const { user } = await auth();
    const userID = user.id;
    
  const { banques, comptes } = await fetchSelectedCompte();
    
  //console.log("fromserver",banques);
    //console.log(comptes);

    return (
        <div>
            <FormComponent userID={userID} banques={banques} comptes={comptes}/> {/* Pass userID as prop */}
        </div>
    );
}

export default AddChequePage;
