import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client()
    databases
    bucket 
    
    constructor () {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost ({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                },
                // ['read:user:' + userId],   // users allowed to read
                // ['write:usern:' + userId]   // users allowed to write
            )
        } catch (error) {
            console.log('Appwrite error', error);
        }
    };

    async updatePost (slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }, 
            );
        } catch (error) {
            console.log(error);         
        }
    }

    async deletePost (slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            );

            return true
        } catch (error) {
            console.log(error);            
            return false
        }
    }

    async getPost (slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            );
        } catch (error) {
            console.log(error);
        
        }
    }

    async getPosts (queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            );
        } catch (error) {
            console.log(error);
            return false            
        }
    }

    // file upload services

    async uploadFile (file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            );
        } catch (error) {
            console.log(error);
            return false 
        }
    }

    async deleteFile (fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    getFilePreview (fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        );
    }
}

// https://fra.cloud.appwrite.io/v1/storage/buckets/694c53fe00041991cb3b/files/69558ec60028ce70eafb/view?project=694c4def000e169b0557&mode=admin

// https://fra.cloud.appwrite.io/v1/storage/buckets/694c53fe00041991cb3b/files/69558ec60028ce70eafb/preview?project=694c4def000e169b0557

const service = new Service()

export default service

