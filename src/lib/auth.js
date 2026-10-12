import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client =
  globalThis.bazarMongoClient ||
  new MongoClient(process.env.MONGODB_URL);

if (process.env.NODE_ENV !== "production") {
  globalThis.bazarMongoClient = client;
}

const db = client.db("bazar-dor");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      overrideUserInfoOnSignIn: true,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },

account: {
  accountLinking: {
    enabled: true,
    disableImplicitLinking: false,
    requireLocalEmailVerified: false,
    updateUserInfoOnLink: true,
  },
},
  database: mongodbAdapter(db, {
    client,
  }),
});