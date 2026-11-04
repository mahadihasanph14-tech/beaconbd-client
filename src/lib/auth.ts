import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || "http://localhost:3000"
  ],
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }
  },
  plugins: [
    jwt({
      jwt: {
        issuer: process.env.BETTER_AUTH_URL || "http://localhost:3000",
        audience: "social-development-api"
      }
    })
  ]
});
