import conf from "../conf/conf.js";
import { Client, Databases, Storage, Query, ID } from "appwrite";


export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, feturedImage, status, userID}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    feturedImage,
                    status,
                    userID
                }
            )
            
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, feturedImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    feturedImage,
                    status
                }
            )
            
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true

        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("Appwrite service :: getPost :: error");
            return false
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
            
        } catch (error) {
            console.log("Appwrite service :: getAllPosts :: error", error);
        }
    }


    // file upload service

    
    async createFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                file
            )
            
        } catch (error) {
            console.log("Appwrite service :: createFile :: error", error);
            return false
        }
    }

    async deleteFile(fileID) {
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileID) {
        try {
            return this.storage.getFilePreview (
                conf.appwriteBucketId,
                fileID
            )
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error", error);
            return false
        }
    }
}

const service = new Service();

export default service