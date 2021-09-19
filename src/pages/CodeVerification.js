
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {useState} from 'react'
import axios from 'axios';
import {serverUrl} from '../api/api';
import {
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    paper : {
        padding : theme.spacing(4),
        marginTop : theme.spacing(10)
    },
    input : {
        marginBottom : theme.spacing(1)
    }
}))

export default (props) => {
    const classes = useStyles(props);
    const [code, setCode] = useState("")

    const [error, setError] = useState("");

    const handelChange = (e) => {
        setCode(e.target.value);
    }

    const handelClick = () => {
        let savedCode = sessionStorage.getItem('code');
        if(savedCode == code) {
            props.history.push('/client');
        }else {
            setError("wrong code");
        }
        // axios.post(serverUrl+"/auth/code", {
        //     code
        // }).then(res => {
        //     if(res.data.error){
        //         console.log(res.data.error);
        //         setError(res.data.error);
        //     }
        //     else 
        //         props.history.push('/client');
        // })
        // .catch(err => console.log(err))
    }
    console.log(serverUrl+"/code");
    return(
        <Container maxWidth="sm">
            <Paper className={classes.paper} elevation={4}>
                <TextField
                    type="text"
                    value={code}
                    onChange={handelChange}
                    fullWidth
                    variant="outlined"
                    className={classes.input}
                />

                {error!="" && (
                    <Typography color="secondary" >
                        {error}
                    </Typography>
                )}

                <Button 
                    variant="contained" 
                    color = "primary" 
                    fullWidth
                    onClick={handelClick}
                >
                    verify Code
                </Button>
            </Paper>
        </Container>
    );
}