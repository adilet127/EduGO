import React, {useEffect,useReducer, useState } from 'react';
import {collection, onSnapshot} from '@firebase/firestore';
import db from '../Firebase';

export const clientContext = React.createContext()

const INIT_STATE = {
    aveScore: [],

}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'GET_AVE_GRAND_SCORE':
            return{...state, aveScore: action.payload}
        default:
            return{...state}
    }
}


const ClientContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE)

    ///////////   Pagination start  ///////////
    const [universities, setUniuniversities] = useState([])
    const uniRef = collection(db, 'universities')
        
    useEffect(
        () => 
          onSnapshot(collection(db, "universities"), (snapshot) => 
          setUniuniversities(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
          ),
        []
    )

    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(8)

    useEffect(() => {
        const fetchUniversities = () => {
            const data = universities || []
            setPosts(data)
        }
        fetchUniversities()

    }, [universities])

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    console.log(posts);
    console.log("slice",posts.slice(indexOfFirstPost, indexOfLastPost))
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    const totalPosts = posts.length
    console.log("pagination",currentPosts);

    const changePage = (newPage) => {
        setCurrentPage(newPage)
    }
    return (
        <clientContext.Provider value={{
            aveScore: state.aveScore,
            currentPosts,
            postsPerPage,
            totalPosts,
            changePage,
            // GetAveScore
        }}>
            {children}
        </clientContext.Provider>
    );
};

export default ClientContextProvider;