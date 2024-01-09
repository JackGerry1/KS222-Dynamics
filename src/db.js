// db.js

// import firebase db dependencies
import { setDoc, doc } from "firebase/firestore";
import { db } from './firebase';

// Table/collection name in Firestore
const db_collection = 'users';

// Function to add or update a username in the 'users' collection in Firestore
export function addUsername(uid, displayName){
    // Reference to the user's document in the 'users' collection
    const userDocRef = doc(db, db_collection, uid);

    // Use setDoc to update or create the document with the provided data
    setDoc(userDocRef, {
        uid: uid,                   // Assign the UID of the user
        displayName: displayName    // Assign the provided display name
    })
    .then(() => {
        // Log success message when the document is updated/created successfully
        console.log("Document updated/created successfully");
    })
    .catch((error) => {
        // Log an error if there's any issue while updating/creating the document
        console.error("Error updating/creating document: ", error);
    });
}
