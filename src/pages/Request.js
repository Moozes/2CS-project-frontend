
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

const TABLE = [
    {
        relation : "wife",
        number : 0
    },
    {
        relation : "husband",
        number : 0
    },
    {
        relation : "mother",
        number : 0
    },
    {
        relation : "father",
        number : 0
    },
    {
        relation : "paternal grandfather",
        number : 0
    },
    {
        relation : "maternal grandmother",
        number : 0
    },
    {
        relation : "paternal grandmother",
        number : 0
    },
    {
        relation : "daughter",
        number : 0
    },
    {
        relation : "son",
        number : 0
    },
    {
        relation : "son's son",
        number : 0
    },
    {
        relation : "son's daughter",
        number : 0
    },
    {
        relation : "mother's brother",
        number : 0
    },
    {
        relation : "mother's sister",
        number : 0
    },
    {
        relation : "full brother",
        number : 0
    },
    {
        relation : "full sister",
        number : 0
    },
    {
        relation : "father's brother",
        number : 0
    },
    {
        relation : "father's sister",
        number : 0
    },
    {
        relation : "full brother's son",
        number : 0
    },
    {
        relation : "paternal uncle's son",
        number : 0
    },
    {
        relation : "father's full brother",
        number : 0
    },
    {
        relation : "father's paternal uncle",
        number : 0
    },
    {
        relation : "full paternal uncle's son",
        number : 0
    },
    {
        relation : "father's paternal uncle's son",
        number : 0
    },
]

function the_max(relation) {
    if(
        relation == "husband" ||
        relation == "mother" ||
        relation == "father" ||
        relation == "paternal grandfather" ||
        relation == "maternal grandmother" ||
        relation == "paternal grandmother" 
    ) return 1;
    if(relation == "wife") return 4;
    return undefined;
}

function index_of_member(table, relation) {
    let i = 0;
    for(i = 0; i < table.length; i++)
        if(table[i].relation == relation)
            break;
    if(i>=table.length) return -1;
    return i;
}






export default (props) => {
    const classes = useStyles(props);
    const [table, setTable] = useState(TABLE);
    const [resultTable, setResultTable] = useState([]);
    const [pictures, setPictures] = useState([
        {
            picture : "",
            discription : ""
        }
    ]);
    const [length, setLength] = useState(1);
    const [msg, setMsg] = useState("");
    

    const handleChange = e => {
        let newTable = [...table];
        let index = index_of_member(table, e.target.name);
        newTable[index].number = parseInt(e.target.value);
        setTable(newTable); 
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(table);
        let inheritance_result_table = [];
        path_diagram(table, inheritance_result_table);
        setResultTable(inheritance_result_table);
    }

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

    const handleAllSubmit = () => {
        let fd = new FormData();
        let newTable = JSON.stringify(table);
        let newResultTable = JSON.stringify(resultTable);
        // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDVlMTlmMTVhZTlhMTUwMGQ2NmEyNCIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2MzE5Njk2OTUsImV4cCI6MTYzMjIyODg5NX0.8ESTCW_WwyhQ-kYv67ZlF0bAYahUvbonvTr2LFeJeDg";
        let token = sessionStorage.getItem('token');

        for(let i = 0; i < pictures.length; i++) {
            fd.append("photos", pictures[i].picture, pictures[i].discription);
        }
        fd.append("token", token);
        fd.append("table", newTable);
        fd.append("result", newResultTable);
        axios.post(serverUrl+"/client/submit", fd)
        .then(res => {
            if(res.data.error)
                setMsg(res.data.error);
            else 
                setMsg(res.data.message)
        })
        .catch(err => console.log(err))

    }
    return (
        <>
        {msg != "" && (    
            <Typography 
                fullWidth
                align="center"
                color="primary"
            >
                {msg}
            </Typography>
        )}
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <form onSubmit={handleSubmit}>
                <TableContainer component={Paper} className={classes.half} >
                    <Table aria-label="simple table" size="small" >
                    <TableHead>
                        <TableRow>
                        <TableCell>Familly Memeber</TableCell>
                        <TableCell align="right">Count</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            {table.map(member => (
                                <TableRow key={member.relation}>
                                    <TableCell component="th" scope="row">
                                        {member.relation}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Input
                                            type="number"
                                            inputProps={{
                                                min:0,
                                                max:the_max(member.relation),
                                                step:"1"
                                            }}
                                            value={member.number}
                                            onChange={handleChange}
                                            name={member.relation}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell component="th" scope="row" align="left" >
                                    <Button variant="outlined" type="submit">calculate</Button>
                                </TableCell>
                            </TableRow>
                    </TableBody>
                    </Table>
                </TableContainer>
            </form>
            </Grid>

            <Grid item xs={6}>
            {resultTable.length != 0 ? (
                 <TableContainer component={Paper}>
                 <Table className={classes.table} size="small" aria-label="a dense table">
                   <TableHead>
                     <TableRow>
                       <TableCell>Category</TableCell>
                       <TableCell align="right">Share (%)</TableCell>
                       <TableCell align="right">reason</TableCell>
                     </TableRow>
                   </TableHead>
                   <TableBody>

                     {resultTable.map((elm) => (
                       <TableRow key={elm.relation}>
                         <TableCell component="th" scope="row">
                           {elm.relation}
                         </TableCell>
                         <TableCell align="right">{Math.round(elm.share*10000)/100}</TableCell>
                         <TableCell align="right">{elm.reason}</TableCell>
                       </TableRow>
                     ))}
                     
                   </TableBody>
                 </Table>
               </TableContainer>
            ) : (
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>tarika for "dawi arham" or state treasury</TableCell>
                        </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            )}
            </Grid>
        </Grid>
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

        <br/>
        <Button 
            variant="contained" 
            onClick={handleAllSubmit}
            color = "primary"
        >
            Submit
        </Button>
        </>
    )
}