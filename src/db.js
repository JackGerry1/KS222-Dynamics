import { setDoc, doc } from "firebase/firestore";
import { db } from './firebase';

// Table in firestore
const db_collection = 'users';

export function addUsername(uid, displayName){
    const userDocRef = doc(db, db_collection, uid);

    // Use setDoc to update or create the document
    setDoc(userDocRef, {
        uid: uid,
        displayName: displayName
    })
    .then(() => {
        console.log("Document updated/created successfully");
    })
    .catch((error) => {
        console.error("Error updating/creating document: ", error);
    });
}