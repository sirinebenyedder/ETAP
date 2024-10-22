import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDB } from "./lib/utils";
import { User } from "./lib/models";
import bcrypt from "bcrypt";   
 
/*fetching data wist const login*/
const login = async (credentials) => {
  try {
    connectToDB();
    const user = await User.findOne({ username: credentials.username });

    /*if there is no user throw yhe error*/
    if (!user || !user.isActive) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");
    //const isPasswordCorrect = credentials.password === user.password;

    if (!isPasswordCorrect) {
      throw new Error("Wrong credentials!");
    }
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
}; 
// pour utiliser la fonction login dans cette fc
/*destraction de signIn , signOut , auth*/
export const { signIn, signOut, auth } = NextAuth(
  {
  ...authConfig,
  
  
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          
          console.log("auth.js file user function ",user);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  // ADD ADDITIONAL INFORMATION TO SESSION
  callbacks: {
    
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.img = user.img;
        //token.email = user.email;
        token.isAdmin = user.isAdmin;
        console.log("c'est un token",{token})
        //zit is admin w user.id

      }
      return token;

    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.img = token.img;
        
        
        //session.user.email = token.email;
        session.user.isAdmin = token.isAdmin;
        console.log("c'est une session",session);
        //zit is admin w user.id 

      }
      return session;
    },
    
  },
  
});


