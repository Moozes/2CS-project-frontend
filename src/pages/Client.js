import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    makeStyles,
    
} from "@material-ui/core";
import {
    Link,
    Switch,
    Route
} from "react-router-dom"
import Home from "./Home";
import Request from "./Request";
import Update from "./Update";

const useStyles = makeStyles(theme => ({
    typography : {
        flex : 1
    }
}))




export default (props) => {
    const classes = useStyles(props);
    const logout = () => {
        sessionStorage.clear();
        props.history.push("/");
    }
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.typography} >
                        Islamic Inheritance
                    </Typography>
                    <Button color="inherit" component={Link} to={`/client/`} >Home</Button>
                    <Button color="inherit" component={Link} to={`/client/request`}>Request</Button>
                    <Button color="inherit" component={Link} to={`/client/update`}>Update</Button>
                    <Button color="inherit" onClick={logout}>logout</Button>
                </Toolbar>
            </AppBar>


            <Switch>
                <Route  path={`/client/request`}>
                    <Request/>
                </Route>
                <Route  path={`/client/update`}>
                    <Update/>
                </Route>
                <Route  path={`/client/`}>
                    <Home />
                </Route>
            </Switch>
        </>
    )
}