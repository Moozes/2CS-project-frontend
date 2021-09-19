
import axios from 'axios';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { 
    TextField,
    Input,
    Button,
    Grid,
    Typography
} from '@material-ui/core';
import path_diagram from '../components/calculatorAlgorithme';
import {serverUrl} from '../api/api';
// console.log(path_diagram);

const useStyles = makeStyles(theme => ({
    half : {
        // width : "50%"
    }
}))


export default (props) => {
    const classes = useStyles(props);
    const [pictures, setPictures] = useState([
        {
            picture : "",
            discription : ""
        }
    ]);
    const [length, setLength] = useState(1);
    const [msg, setMsg] = useState("");

    const fileChengeHandler = (e) => {
        const index = parseInt(e.target.id);
        let newPictures = pictures;
        newPictures[index].picture = e.target.files[0];
        setPictures(newPictures);
        console.log(pictures);
    }

    const discriptionChangeHandler = (e) => {
        const index = parseInt(e.target.id);
        let newPictures = pictures;
        newPictures[index].discription = e.target.value
        setPictures(newPictures);
        console.log(pictures);
    }

    const addField = () => {
        console.log("click")
        let newPictures = pictures;
        newPictures.push(
            {
                picture : "",
                discription : ""
            }
        );
        setPictures(newPictures);
        setLength(newPictures.length);
        console.log(pictures);
    }

    const handleSubmit = () => {
        let fd = new FormData();
        for(let i = 0; i < pictures.length; i++) {
            fd.append("photos", pictures[i].picture, pictures[i].discription);
        }
        // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDYxYTQyNzFhMjA3Njc0NGI3MDIxNiIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2MzE5ODQxOTQsImV4cCI6MTYzMjI0MzM5NH0.VuFB2s1Z4VT8rChI14PkSDvkslovjNY31rJ6IBfmnlU";
        let token = sessionStorage.getItem('token');
        fd.append('token', token);
        axios.put(serverUrl+"/client/update", fd)
        .then(res => {
            if(res.data.error)
                setMsg(res.data.error);
            else 
                setMsg(res.data.message)
        })
        .catch(err => console.log(err))
    }


    return (
        <div>
        {msg != "" && (    
            <Typography 
                fullWidth
                align="center"
                color="primary"
            >
                {msg}
            </Typography>
        )}
        {pictures.map((elm, index) => (
            <div key={index}>
                <Input
                    type="file"
                    onChange={fileChengeHandler}
                    id={`${index}`}
                />
                <TextField
                    variant="outlined"
                    placeholder="discription"
                    type="text"
                    id={`${index}`}
                    onChange={discriptionChangeHandler}
                    // value={pictures[0].discription}
                />
                <br/>
            </div>
        ))}
        <br/>
        <Button 
            variant="contained"
            onClick={addField}
        >
            add field
        </Button>

        <Button
            variant="contained"
            onClick={handleSubmit}
        >
            submit
        </Button>
        </div>
    )
}