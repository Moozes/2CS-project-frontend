import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { 
    Paper,
    Button,
    Typography,
    Container,
    makeStyles,
    Grid,
    Collapse
} from "@material-ui/core"
import logo from "../images/bg.jpg";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '../api/api';

const useStyles = makeStyles(theme => ({
    paper : {
        padding : theme.spacing(3),
        marginTop : theme.spacing(3)
    },
    bold : {
        fontWeight : "bold"
    },
    img : {
        width : "100%",
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
];

const RESULTTABLE = [
    {
        relation : "father",
        share : 0.1667,
        reason : "fardan"
    },
    {
        relation : "father",
        share : 0.1667,
        reason : "fardan"
    },
    {
        relation : "father",
        share : 0.1667,
        reason : "fardan"
    },
];

const t = [1,2];

export default (props) => {
    const classes = useStyles(props);
    const [open, setOpen] = useState([]);

    const [table, setTable] = useState([]);
    const [result, setResult] = useState([]);

    const [cases, setCases] = useState([]);

    useEffect(() => {
        axios.get(serverUrl+"/admin/shownew")
        .then(res => {
            console.log(res.data);
            if(res.data.error) {
                console.log(res.data.error);
            } else {
                let openTable = [];
                for(let i = 0; i<res.data.length; i++) {
                    openTable.push(false);
                }
                setOpen(openTable);
                setCases(res.data)
            }
        })
        .catch(err => console.log(err))
    }, [])

    const toggleSow = (index) => {
        let newOpen = open.map((elm, i)=> {
            if(i == index) return !elm;
            return elm;
        })

        setOpen(newOpen)
    }

    const complete = (id) => {
        axios.put(serverUrl+"/admin/status", {
            id,
            status : 'HISTORY'
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const remove = (id) => {
        axios.put(serverUrl+"/admin/status", {
            id,
            status : 'HIDING'
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    return(
        <Container maxWidth="md">
        {cases.map((elm, index) => (

        
            <Paper className={classes.paper} key={index}>
                <Typography className={classes.bold}>
                    Name : {elm.client.fullName}
                </Typography>
                <Typography className={classes.bold}>
                    email : <a href={`mailto:${elm.client.email}`}>{elm.client.email}</a>
                </Typography>
                <Typography className={classes.bold}>
                    Tel : {elm.client.phone}
                </Typography>
                <br/>
                <Typography>
                    Paper Work
                </Typography>

                <Button
                    variant="outlined"
                    onClick={() => toggleSow(index)}
                >
                    {open[index]? "hide" : "show"}
                </Button>
                <Button variant="outlined" color="primary"
                    onClick={() => {complete(elm._id)}}
                >
                    complete
                </Button>
                <Button variant="outlined" color="secondary"
                    onClick={() => remove(elm._id)}
                >
                    remove
                </Button>
            
                <Collapse in={open[index]} timeout="auto" unmountOnExit>

                <Grid container spacing={3}>

                    {/* <a href={logo} target="_blank">click</a> */}

                    {elm.images.map(elm => (
                        <Grid item xs={6}  key={elm}>
                            <a href={serverUrl+"/"+elm.url} target="_blank"><img src={serverUrl+"/"+elm.url} className={classes.img}/></a>
                            <br/>
                            <Typography
                                color="textSecondary"
                            >
                                {elm.desc}
                            </Typography>
                        </Grid>
                    ))}

                </Grid>

                <TableContainer component={Paper}  >
                        <Table aria-label="simple table" size="small" >
                            <TableHead>
                                <TableRow>
                                <TableCell>Familly Memeber</TableCell>
                                <TableCell align="right">Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {elm.table.map(elm => (
                                <TableRow key={elm}>
                                    <TableCell>
                                        {elm.relation}
                                    </TableCell>
                                    <TableCell>
                                        {elm.number}
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                </TableContainer>


                <br/><br/>
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

                        {elm.result.map((elm) => (
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

                </Collapse>
            </Paper>
        ))}
       
     
        </Container>
    )
}



