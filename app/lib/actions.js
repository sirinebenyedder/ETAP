"use server"
import { connectToDB } from "./utils";
import { Banque, Cheque, User, Compte } from "./models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
//import mongoose from "mongoose";

export const addUser = async (prevState,FormData) =>{
    const { username ,email , password,isAdmin, isActive } = Object.fromEntries(FormData);

    try {
        connectToDB();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({username ,email , password:hashedPassword, isAdmin, isActive });
       await newUser.save();
    
    }catch(err){
        if (err.message.includes('MongoError') || err.message.includes('E11000') || err.message.includes("User validation failed"))  {
            return "Des données non conformes ont été détectées. Veuillez vérifier vos entrées et réessayer. ";
    
          }
        
          throw err;
    }
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
    

    

};
export const addCheque = async (FormData) =>{
    const {idcompte , idbanque, motif,beneficiary ,datevaleur , type ,montant,creepar} = Object.fromEntries(FormData);
        
    try {
        connectToDB();
        //YE5OU FIL ID TA3 USER W I7OT FEHA FIL CREEPAR
        //const creepar = await User.findOne({creepar : User.id})
        const newCheque = new Cheque({idcompte,idbanque,motif ,type ,montant, creepar , datevaleur ,beneficiary });

        await newCheque.save()
    }catch(err){
        console.log(err);
        throw new Error("Failed to create Cheque!");

    }

    revalidatePath("/dashboard/cheque");
    redirect("/dashboard/cheque");

};
export const deleteUser = async (FormData) => {
    const { id }=Object.fromEntries(FormData);

    try {connectToDB();
        await User.findByIdAndDelete(id)
    }catch (err){console.log(err)
        throw new Error ("Failed to delete user!");
    }
    revalidatePath("/dashboard/users");

};

export const updateUser = async (FormData) =>{
    const { id,username ,email , password,isAdmin, isActive } = Object.fromEntries(FormData);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        connectToDB();
        const updateFields = {username ,email , password :hashedPassword,isAdmin, isActive }
        Object.keys(updateFields).forEach(
            (key)=> (updateFields[key] === "" || undefined) && delete updateFields[key]
        );
        await User.findByIdAndUpdate(id,updateFields);
    }catch(err){
        console.log(err);
        throw new Error("Failed to create user!");

    }

    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");

};
// update the cheque

export const updateCheque = async (FormData) =>{
    const { id, montant, beneficiary,motif,datevaleur} = Object.fromEntries(FormData);
    /*const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);*/
    try {
        connectToDB();
        const updateFields = { montant, beneficiary,motif,datevaleur};
        Object.keys(updateFields).forEach(
            (key)=> (updateFields[key] === "" || undefined) && delete updateFields[key]
        );
        await Cheque.findByIdAndUpdate(id,updateFields);
    }catch(err){
        console.log(err);
        throw new Error("Failed to create user!");

    }

    revalidatePath("/dashboard/cheque");
    redirect("/dashboard/cheque");

};

export const authenticate = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);
  
    try {
      await signIn("credentials", { username, password });
    } catch (err) {
      if (err.message.includes("CredentialsSignin")) {
        return "identifiants incorrects";
      }
      throw err;
    }
  };


export const annulation = async (FormData) => {
    const { id }=Object.fromEntries(FormData);
    try{
    connectToDB ();
    await Cheque.findByIdAndUpdate(id , {etat: "annulé"});
}
    catch(err){
        console.log(err);
        throw new Error("Failed to change the etat!");

    }
    revalidatePath("/dashboard/cheque");

};
//
export const deleteBanque = async (FormData) => {
    const { id }=Object.fromEntries(FormData);

    try {connectToDB();
        await Banque.findByIdAndDelete(id)
    }
    catch (err)
    {
        console.log(err)
        throw new Error ("Failed to delete banque!");
    }
    revalidatePath("/dashboard/banque");

};//
export const addBanque = async (FormData) =>{
    const { nom } = Object.fromEntries(FormData);

    try {
        

        const newBanque = new Banque ({nom});

       await newBanque.save()
    }catch(err){
        console.log(err);
        throw new Error("Failed to create banque!");

    }

    revalidatePath("/dashboard/banque");
    redirect("/dashboard/banque");

};


export const addCompte = async (FormData) =>{
    const { num ,nomBanque } = Object.fromEntries(FormData);

    try {
        

        const newCompte = new Compte ({num , nomBanque});

       await newCompte.save()
    }catch(err){
        console.log(err);
        throw new Error("Failed to create an account !");

    }

    revalidatePath("/dashboard/compte");
    redirect("/dashboard/compte");

};

export const deleteCompte = async (FormData) => {
    const { id }=Object.fromEntries(FormData);

    try {connectToDB();
        await Cheque.findByIdAndUpdate(id , {etat: false});
    }
    catch (err)
    {
        console.log(err)
        throw new Error ("Failed to delete compte!");
    }
    revalidatePath("/dashboard/compte");

};

/*upadte the dateentrecaisse
export const UpdateEntreeCaisse = async (FormData) => {
    const { id, dateentreecaisse } = Object.fromEntries(FormData);
    
    try {
        connectToDB();
        const updateFields = {
            dateentreecaisse, // User-provided date
             //etat: "émis"      Automatically set 'etat' to 'emis'
        };

        // Perform the update operation
        await Cheque.findByIdAndUpdate(id, updateFields);}
    catch (err)
    {
        console.log(err)
        throw new Error ("Failed to insert the date entree caisse!");
    }
    revalidatePath("/dashboard/emission");
    redirect("/dashboard/emission");
};*/

//the same form with 2 actions 
export const UpdateEntreeCaisse = async (FormData) => {
    const { id, dateentreecaisse, dateemission, action ,emipar} = Object.fromEntries(FormData);

    try {
        await connectToDB(); // Await if this function involves any asynchronous operations

        if (action === "updateEntreeCaisse" && dateentreecaisse) {
            // Update dateentreecaisse 
            const updateFields = {
                dateentreecaisse,
                
            };
            
            await Cheque.findByIdAndUpdate(id, updateFields);
        } else if (action === "updateDateEmission" && dateemission) {
             // Check if dateentreecaisse is defined and not empty
             const cheque = await Cheque.findById(id);
            
             if (!cheque.dateentreecaisse) {
                 throw new Error("Cannot update date emission because date entree caisse is not defined.");
             };
            // Update dateemission
            const updateFields = {
                dateemission,
                etat: "émis",
                emipar,

            };
            
            await Cheque.findByIdAndUpdate(id, updateFields);
        } else {
            throw new Error("No valid action or date provided.");
        }

        
    } catch (err) {
        console.log(err);
        throw new Error("Failed to update cheque information!");
    }
    // Revalidate the path and redirect after the update
    revalidatePath("/dashboard/emission");
    redirect("/dashboard/emission");
};

