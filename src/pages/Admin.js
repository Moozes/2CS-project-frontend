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
import AdmiHome from "./AdmiHome";
import AdminArchive from "./AdminArchive";
import CalculatorUI from "../components/CalculatorUI";

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
                    <Button color="inherit" component={Link} to={`/admin_home/`} >cases</Button>
                    <Button color="inherit" component={Link} to={`/admin_home/archive`}>archive</Button>
                    <Button color="inherit" component={Link} to={`/admin_home/calculator`}>calculator</Button>
                    <Button color="inherit" onClick={logout}>logout</Button>
                </Toolbar>
            </AppBar>


            <Switch>
                <Route  path={`/admin_home/archive`}>
                    <AdminArchive/>
                </Route>
                <Route  path={`/admin_home/calculator`}>
                    <CalculatorUI/>
                </Route>
                <Route  path={`/admin_home/`}>
                    <AdmiHome/>
                </Route>
            </Switch>
        </>
    )
}