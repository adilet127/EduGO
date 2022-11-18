import { collection, doc, addDoc, updateDoc } from '@firebase/firestore';
import db from '../Firebase';


export const handleFavs = async(favUni) => {
    const collectionRef = collection(db, "favorites")
    const payload = {
        name: favUni.name,
        rank: +(favUni.rank), 
        status: favUni.status, 
        totalFaculty: +(favUni.totalFaculty), 
        tuitionStart: +(favUni.tuitionStart),
        aveForGrant: +(favUni.aveForGrant),
        grantCount: +(favUni.grantCount),
        link: favUni.link}
        
    const docRef = await addDoc(collectionRef, payload)
    console.log("button clicked");
    console.log("favUniID:", docRef.id)

}
export const handleClick = async(newUni) => {
    const collectionRef = collection(db, "universities")
    const payload = {
        name: newUni.name,
        rank: +(newUni.rank), 
        status: newUni.status, 
        totalFaculty: +(newUni.totalFaculty), 
        tuitionStart: +(newUni.tuitionStart),
        aveForGrant: +(newUni.aveForGrant),
        grantCount: +(newUni.grantCount),
        link: newUni.link}
        
    const docRef = await addDoc(collectionRef, payload)
    console.log("button clicked");
    console.log("new uniID:", docRef.id);

}
export const handleCommentClick = async(newComment) => {
    const collectionRef = collection(db, "comments")
    const payload = {
        name: newComment.name,
        commentText: newComment.commentText}
        
    const docRef = await addDoc(collectionRef, payload)
    console.log("button clicked");
    console.log("new comment id:", docRef.id);

}

export const handleEdit = async(id, editedUni) => {
    const docRef = doc(db, "universities", id)
    const payload = {editedUni}
    updateDoc(docRef, editedUni)
    console.log("update");
    console.log("Here: ", payload);
}


//////////////////////add///////////////////
    // const payload = {
    //     name: "Кыргызская государственная юридическая академия",
    //     rank: 8, 
    //     status:"Государственный" , 
    //     totalFaculty: 16, 
    //     tuitionStart: 29950 ,
    //     aveForGrant: 385,
    //     grantCount: 86,
    //     link: "https://www.ksla.kg/ru/" }
    // const docRef = doc(db, "universities", "tNmGnEoB8yk2wpWcM7t9")
    // await setDoc(docRef, payload)