import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    makeStyles
} from "@material-ui/core";
import {
    Link
} from "react-router-dom"

const useStyles = makeStyles(theme => ({
    typography : {
        flex : 1
    }
}))



export default (props) => {
    const classes = useStyles(props);
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.typography} >
                    Islamic Inheritance
                </Typography>
                <Button color="inherit" component={Link} to="/">Login</Button>
                <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </Toolbar>
        </AppBar>
    )
}