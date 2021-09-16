import { useState } from "react";
import bg from '../images/bg.jpg';

import {
    Button,
    TextField,
    Typography,
    Paper,
    Container,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    div : {
        // minHeight : "100vh",
        // background : `url('${bg}') no-repeat center center / cover`
    },
    container : {
        paddingTop : theme.spacing(2)
    },
    paper : {
        padding : theme.spacing(2)
    },
    marginB : {
        marginBottom : theme.spacing(2)
    },
    pointer : {
        cursor : "pointer"
    }
}))


export default (props) => {
    const classes = useStyles(props);
    const [inputType, setInputType] = useState("password");
    const [formData, setFormData] = useState({
        name : "",
        email : "",
        phone : "",
        password : "",
        confirm_password : ""
    })
    const [error, setError] = useState("");

    const onInputChange = (e) => {
        let newFormData = {...formData};
        newFormData[e.target.name] = e.target.value;
        setFormData(newFormData);
    }

    const togglePassword = () => {
        if(inputType == "password")
            setInputType("text");
        else setInputType("password");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("subed");
        if(formData.password != formData.confirm_password) 
            setError("passwords dont match!");
        else  {
            setError("");
            // send request to server, if signup success redirect to login
            props.history.push("/");
        } 
    }
    return (
        <div className={classes.div} >
            <Container maxWidth="xs"  className={classes.container} >
                <Paper className={classes.paper} elevation={4}>
                    <Typography 
                        align="center" 
                        paragraph 
                        variant="h4" 
                        color="primary"
                    >
                        Signup
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField 
                            className={classes.marginB} 
                            fullWidth label="Full Name" 
                            variant="outlined"
                            type="text"
                            required
                            value={formData.name || ""}
                            name="name"
                            onChange={onInputChange}
                        />
                        <TextField 
                            className={classes.marginB} 
                            fullWidth 
                            label="Email" 
                            variant="outlined"
                            type="email"
                            required
                            value={formData.email}
                            name="email"
                            onChange={onInputChange}
                        />
                        <TextField 
                            className={classes.marginB} 
                            fullWidth label="Phone Number" 
                            variant="outlined"
                            type="tel"
                            required
                            value={formData.phone}
                            name="phone"
                            onChange={onInputChange}
                        />
                        <TextField 
                            className={classes.marginB} 
                            fullWidth label="Password" 
                            variant="outlined"
                            type={inputType}
                            required
                            value={formData.password}
                            name="password"
                            onChange={onInputChange}
                        />
                        <TextField 
                            className={classes.marginB} 
                            fullWidth label="Confirm Password" 
                            variant="outlined"
                            type={inputType}
                            required
                            value={formData.confirm_password}
                            name="confirm_password"
                            onChange={(e) => onInputChange(e)}
                        />

                        {error != "" && (
                            <Typography color="secondary" variant="subtitle1" className={classes.pointer} onClick={togglePassword} >
                                {error}
                            </Typography>
                        )}

                        
                        <Typography color="textSecondary" variant="subtitle1" className={classes.pointer} onClick={togglePassword} >
                            {inputType == "password" ? "show" : "hide"} password
                        </Typography>

                        <Button 
                            className={classes.marginB} 
                            fullWidth 
                            color="primary" 
                            variant="contained" 
                            type="submit"
                        >Signup</Button>
                    </form>

                    
                </Paper>
            </Container>
        </div>
    );
}
