import { useState } from "react";

import {
    Button,
    TextField,
    Typography,
    Paper,
    Container,
    makeStyles
} from "@material-ui/core";
import axios from "axios";
import { serverUrl } from "../api/api";

const useStyles = makeStyles(theme => ({
    container : {
        paddingTop : theme.spacing(10)
    },
    paper : {
        padding : theme.spacing(2)
    },
    marginB : {
        marginBottom : theme.spacing(2)
    }
}))


export default (props) => {
    const classes = useStyles(props);

    const [formData, setFormData] = useState({
        email : "",
        password : ""
    });

    const [error, setError] = useState("");

    const handleChange = e => {
        let newFormData = {...formData};
        newFormData[e.target.name] = e.target.value;
        setFormData(newFormData);
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log("submited");
        // send request to server if success, redirect to home or admin_home
        axios.post(serverUrl+"/auth/signin", {
            email: formData.email,
            password : formData.password
        })
        .then(res => {
            if(res.data.error) {
                console.log(res.data.error);
                setError(res.data.error)
            } else {
                props.saveToken(res.data.token);
                if(res.data.role == "client")
                    props.history.push('/client');
                else 
                props.history.push('/admin_home');
            }
        })
        .catch(err => console.log(err))
        
    }
    console.log(serverUrl+"/signin");
    return (
        <Container maxWidth="xs"  className={classes.container} >
            <Paper className={classes.paper} elevation={4}>
                <Typography 
                    align="center" 
                    paragraph 
                    variant="h4" 
                    color="primary">
                    Login
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField 
                        className={classes.marginB} 
                        fullWidth 
                        label="Email" 
                        variant="outlined"
                        name="email"
                        type="email"
                        value={FormData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField 
                        className={classes.marginB} 
                        fullWidth 
                        label="Password" 
                        variant="outlined"
                        name="password"
                        type="password"
                        value={FormData.password}
                        onChange={handleChange}
                        required
                    />

                    {error!="" && (
                        <Typography color="secondary" >
                            {error}
                        </Typography>
                    )}

                    <Button 
                        className={classes.marginB} 
                        fullWidth 
                        color="primary" 
                        variant="contained" 
                        type="submit"
                    >Login</Button>
                </form>


                <br/>
                {/* <Typography  
                    component="a" 
                    href="#" 
                    variant="subtitle1" 
                    color="textSecondary">
                    Forgot Password?
                </Typography> */}
            </Paper>
        </Container>
    );
}