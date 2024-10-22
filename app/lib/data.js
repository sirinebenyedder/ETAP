import { error } from "console";
import { Cheque , User , Banque , Compte } from "./models";
import { connectToDB } from "./utils";



export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).countDocuments();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
 

export const fetchCheques = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDB();
    const count = await Cheque.find({$or: [
      { title: { $regex: regex } },
      { beneficiary: { $regex: regex } }
  ]}).countDocuments();
    //console.log(count);
    const cheques = await Cheque.find({$or: [
      { title: { $regex: regex } },
      { beneficiary: { $regex: regex } }
  ]})
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, cheques };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch cheques");
  }
};
export const fetchUser = async (id) => {

  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchCheque = async (id) => {
  try {
    connectToDB();
    const cheque = await Cheque.findById(id)
    .populate({
      path: 'idbanque',
      select: 'nom', 
    }).populate({
      path:'idcompte',
      select: 'num',
    }).populate({
      path:'emipar',
      select:'username',
    });
    return cheque ;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch cheque!");
  }
};
export const fetchName = async (id) => {
  try {
  const user = await User.findById(id);
  const name = user.username;
    return name ;

  } catch (err){
    console.log (err);
    throw new Error ("failed to fetch the name");
  }

};
// fetchTotal ta3 les utilisateurs eli fil dashboard
export const fetchTotal = async() => {
  try {
    connectToDB ();
    const actives = await User.find({ isActive:true }).countDocuments();
    const utilisateurs = await User.countDocuments();
    return {actives , utilisateurs};
  } 
  catch (err){
    console.log(err);
    throw new Error ("failed");

  };
};
// les cheques eli mawjoudin fil dashboard
export const fetchEmi = async () => { 
  try {
    connectToDB ();
    const emmi = await Cheque.find({ etat:"émis" }).countDocuments();
    const cheques = await Cheque.countDocuments();
    return {emmi , cheques};
  } 
  catch (err){
    console.log(err);
    throw new Error ("failed");

  };
};


export const fetchBanques = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDB();
    const count = await Banque.find({ nom: { $regex: regex } }).countDocuments();
    //console.log(count);
    const banques = await Banque.find({ nom: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, banques };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch banques");
  }};

  export const fetchComptes = async (q, page) => {
    const regex = new RegExp(q, "i");
  
    const ITEM_PER_PAGE = 10;
  
    try {
      connectToDB();
      
      const count = await Compte.find({ num: { $regex: regex } }).countDocuments();
      //console.log(count);
      const comptes = await Compte.find({ num: { $regex: regex } })
      .populate({ path: 'nomBanque', select: 'nom' })
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);
      
        
      return { count, comptes };
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch Compte");
    }};


    export const fetchSelection = async () => {
      try {connectToDB();
        const banks = await Banque.find();
        

        return banks;
      } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch the selection");
      }
    };

    

    export const fetchingbank = async (id) =>{
      try{connectToDB ();
        const names = await Banque.findById(id);
        return names;
      }catch(err){
        console.log(err);
        throw new Error("Failed to fetch the banks names");
      }
    }

    // fetching compte bich n7othom fi selection w ni5tar minhom lil cheque
    
    export const fetchSelectedCompte = async () =>{
      try {connectToDB();
        const banques = await Banque.find().lean();
        const comptes = await Compte.find().populate('nomBanque').lean(); ;

        return {banques , comptes};
      } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch the selection in cheque form");
      }
    };
// fetching les compte pour etre emis
  /*export const fetchEmission = async () => {
    try{
      connectToDB();
      const emission = await Cheque.find({ etat: "en cours" });

      return emission
    }catch(err){
      console.log(err);
      throw new Error ("failed to fetch");

    }
  };*/
  export const fetchChequeEmis = async (q, page) => {
    const regex = new RegExp(q, "i");
  
    const ITEM_PER_PAGE = 10;
  
    try {
      connectToDB();
      
      const conteurs = await Cheque.find({ title: { $regex: regex }, etat: "en cours" }).countDocuments();
      //console.log(count);
      const chequeEmi = await Cheque.find({ title: { $regex: regex } , etat: "en cours"})
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);
      
        
      return { conteurs, chequeEmi };
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch Cheque");
    }};
// fetch one cheque emi
export const fetchOneChequeEmi = async (id) => {
  try {
    connectToDB();
    const chequeemi = await Cheque.findById(id);
    

    return chequeemi ;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch this cheque");
  }
};