import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import AuthContextProvider from './context/AuthContext';
import ClientContextProvider from './context/ClientContext';
// import { ADMIN_EMAIL } from './helpers/const';
import AdminPage from './pages/AdminPage';
import DetailPage from './pages/DetailPage';
import EditPage from './pages/EditPage';
import FavPage from './pages/FavPage';
import ForgotPassPage from './pages/ForgotPassPage';
import MainPage from './pages/MainPage';
import ResetPage from './pages/ResetPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

const Routes = () => {
    return (
        <AuthContextProvider>
            <ClientContextProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path = "/" component = {MainPage}/>
                        <Route exact path = "/favs" component = {FavPage}/>
                        <Route exact path = "/admin" component = {AdminPage}/>
                        <Route exact path = "/edit/:id" component = {EditPage}/>
                        {/* <ProtectedRoute exact path = "/edit/:id" component = {EditPage}/> */}
                        <Route exact path = "/signin" component = {SignInPage}/>
                        <Route exact path = "/signup" component = {SignUpPage}/>
                        <Route exact path = "/forgotp" component = {ForgotPassPage}/>
                        <Route exact path = "/reset" component = {ResetPage}/>
                        <Route exact path = "/details/:id" component = {DetailPage}/>
                    </Switch>
                </BrowserRouter>
            </ClientContextProvider>
        </AuthContextProvider>
    );
};

export default Routes;

// const ProtectedRoute = (props) => {
//     const location = useLocation()
//     const { currentUser } = useAuth()
//     const {path} = props

//     if (path === "/signin" ){
//         return currentUser ? <Redirect to = {location.state?.form ?? "/"}/> :
//         <Route {...props}/>
//     } 
//     return currentUser ?
//                 currentUser.email ==! ADMIN_EMAIL ?(
//                     <Route {...props}/> 
//                 ):(
//                     <Redirect to={{
//                     pathname: '/signin',
//                     state: {from: path}
//                     }}/>
//                 )
// }