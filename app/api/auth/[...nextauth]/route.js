import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/models/user";

// Small helper to reuse a mongoose connection in dev to avoid multiple connections
async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/coffeeDB";
  try {
    await mongoose.connect(uri);
  } catch (err) {
    console.error('MongoDB connection error', err);
    throw err;
  }
}


const handler = NextAuth({
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      // ...add more providers here
    ],

    callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // You can add custom sign-in logic here if needed
            if(account.provider === "github") {
                // ensure DB connection
                await connectDB();
                // determine email (NextAuth may supply it on user object)
                const userEmail = (user && user.email) || email;
                if (!userEmail) return true; // can't proceed without email
                //check if user exists
                const currentUser = await User.findOne({ email: userEmail });
                    if(!currentUser) {
                        //if not, create a new user
                        try {
                            const newUser = new User({
                              email: userEmail,
                              username: userEmail.split("@")[0]
                            });
                            await newUser.save();
                        // attach username for later use if needed
                        user.name = newUser.username;
                        } catch (error) {
                            console.error("Error creating user:", error);
                        }
                    } 
            }
          return true; // Allow sign-in    
      }
      ,
      async session({ session, user, token }) {
        // DEBUG: inspect shapes — remove or comment out in production
       // inside your session callback (server)
            console.dir(session, { depth: null, colors: true });
            console.dir(token, { depth: null, colors: true });
            console.dir(user, { depth: null, colors: true });
        try {
          await connectDB();
          const userEmail = session?.user?.email;
          if (!userEmail) return session;
          const dbUser = await User.findOne({ email: userEmail });
          console.log(dbUser)
          if (dbUser && dbUser.username) session.user.name = dbUser.username;
        } catch (err) {
          console.warn('session callback db error', err);
        }
        return session;
      },
    }
});

export { handler as GET, handler as POST };
