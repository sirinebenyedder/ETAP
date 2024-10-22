export const authConfig = {
  
    providers:[],
    pages: {
      signIn: "/login",
    }, 
    callbacks: {
      authorized({ auth , request }) {
        const isLoggedIn = auth?.user;
        /*console.log(auth);
        
        const Role = auth?.user.isAdmin;
        console.log("role",Role);*/
        console.log(isLoggedIn);
        const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
        if (isOnDashboard) {
          if (isLoggedIn) return true;
          return false;
        } else if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", request.nextUrl));
        }
        return true;
      },
    },
  };