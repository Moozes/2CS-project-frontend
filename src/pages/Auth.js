import Login from '../components/Login';
import Signup from '../components/Signup';
import Navbar from '../components/Navbar';
import CodeVerification from './CodeVerification';

import {
    Router,
    Switch,
    Route,
    Redirect,
    Link,
    useRouteMatch
  } from "react-router-dom"

export default (props) => {
    return (
        <>
            <Navbar/>

            <Switch>
                <Route  path={`/signup`}>
                    <Signup history={props.history} saveToken={props.saveToken} />
                </Route>
                <Route  path={`/code_verification`}>
                    <CodeVerification history={props.history}/>
                </Route>
                
                <Route  path={`/`}>
                    <Login history={props.history} saveToken={props.saveToken} />
                </Route>
            </Switch>
        </>
    );
}