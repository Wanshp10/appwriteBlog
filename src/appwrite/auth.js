import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

// Here we are making class of the function we are making an object of that class and exporting that object 

export class AuthService {
    // Rather than initializing the API endpoint and password at the start only we initialize it through an constructor because if we do that before it is an waste of resources
    client = new Client()
    account

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount ({email, password, name}) {
        try {
            const userAccount = await this.account.create(
                ID.unique(), 
                email, 
                password,
                name
            )
            if(userAccount){
                //call another method
                // return userAccount
                return this.login({email, password})
            }
            else{
                return userAccount
            }
        } catch (error){
            throw error
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            )
        } catch (error) {
            throw error
        }     
    };

    async getCurrentUser () {
        try {
            return await this.account.get(); 
        } catch (error) {
            console.error("User is not authenticated:", error.message);
        }
        return null
    }

    async logout () {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService()

export default authService

// const client = new Client()
//     .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');                 // Your project ID

// const account = new Account(client);

// const user = await account.create({
//     userId: ID.unique(), 
//     email: 'email@example.com', 
//     password: 'password'
// });
