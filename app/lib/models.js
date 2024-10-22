import mongoose from "mongoose";
//import { type } from "os";


//
const counterSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  count: { type: Number, default: 0 },
});
//
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [3 , 'Username must be at least 3 characters long.'],
      maxlength: [20 , 'Username must be at most 20 characters long.'],
    },
    email: {
      type: String,
      required: [true, 'email required'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: String,
      required:true,
      
    },
    isActive: {
      type: Boolean,
      default: true,
    },
},

  { timestamps: true }
);

const chequeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    montant: {
      type: Number,
      required: true,
      min: 10,
    },
    etat: {
      type: String,
      enum: ['en cours', 'annulé', 'émis'], // Allowed values
      default: 'en cours',
    },
    creepar : {
      type: mongoose.Types.ObjectId ,
      ref:'User',
      
    },
    idbanque: {
    type: mongoose.Types.ObjectId ,
    ref:'Banque',
    }, 
    idcompte: {
      type: mongoose.Types.ObjectId ,
      ref:'Compte',
      },
    datevaleur: {
      type: Date,
      required : true,
    },
    beneficiary: {
      type: String,
    },
    dateentreecaisse :{
      type:Date,

    },
    dateemission : {
      type:Date,
    },
    motif : {
      type: String,
      required: true,
    },
    emipar : {
      type: mongoose.Types.ObjectId ,
      ref:'User',
      
    },
  },
  { timestamps: true }
);
//presave to chequeSchema
chequeSchema.pre('save', async function (next) {
  const doc = this;
  const currentYear = new Date().getFullYear();

  // Find the counter document for the current year
  let counter = await Counter.findOne({ year: currentYear });

  // If no counter document exists for the current year, create one
  if (!counter) {
      counter = new Counter({ year: currentYear, count: 0 });
  }
  console.log("counter avant incre", counter.count);
  // Increment the counter
  counter.count += 1;
  console.log("counter apres incre", counter.count);
  
  // Save the updated counter
  await counter.save();

  // Format the counter count as a 6-digit number
  const countFormatted = String(counter.count).padStart(6, '0');

  // Set the title field (e.g., "2022000001")
  doc.title = `${currentYear}${countFormatted}`;
  console.log("dic.title", doc.title);

  next();
});
//


const banqueSchema = new mongoose.Schema({
  nom : { type: String,
      required: true,
      unique: true,
      min: 2,
      max: 20, }
   

},
);
const compteSchema = new mongoose.Schema({
  num: { type: String,
      required: true,
      unique: true,
     },

  nomBanque : {
    type: mongoose.Types.ObjectId ,
    ref: 'Banque',
    },

  etat: {        
      type: Boolean,
      default: true,
  },
   
},
);


//
export const Counter = mongoose.models.Counter|| mongoose.model("Counter", counterSchema);
//


export const User = mongoose.models.User || mongoose.model("User", userSchema);


export const Cheque =
mongoose.models.Cheque || mongoose.model("Cheque", chequeSchema);


export const Banque =
mongoose.models.Banque || mongoose.model("Banque", banqueSchema);

export const Compte =
mongoose.models.Compte || mongoose.model("Compte", compteSchema);
