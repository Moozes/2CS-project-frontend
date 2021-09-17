import { 
    Paper,
    Container,
    Typography,
    Button
} from "@material-ui/core";
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useState } from "react";

const useStyles = makeStyles(theme => ({
    bold : {
        fontWeight : "bold"
    },
    paper : {
        marginBottom : theme.spacing(5),
        padding : theme.spacing(5)
    },
    div : {
        marginBottom : theme.spacing(5),
    }
}))

const STEPS = [
    "Pay up front and take a snapshot of the transaction, CCP : xxx-xxx-xxx",
    "Go to Request's page",
    "Fill in the table of relatives of the deceased",
    "Click on Calculate, a result table will show up",
    "Add photos of the necessary documents, including the payment transaction snapshot",
    "Click on request",
    "After the case is processed by the notary. The office will contact you to come to collect the document",
    "You must bring all documents with you in paper form with two adult witnesses"
]

const DOCUMENTS = [
    "Birth and death certificate of the deceased",
    "Parents' birth certificate, if alive",
    "Fot Spouses, birth certificates and marriage contracts",
    "A family certificate for each wife",
    "Offspring's birth certificates",
    "Relatives' birth certificates"
]


export default (props) => {
    const classes = useStyles(props);
    const [open, setOpen] = useState(false);

    return(
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                <Typography variant="h6" className={classes.bold} >
                    Through this website, you can request a document of the division of the estate from the notary Rahmi Ahmed, following these steps
                </Typography>
            </Paper>


            <Paper className={classes.paper}>
                <List>
                    {STEPS.map(elm => (
                        <ListItem button key={elm} >
                            <ListItemIcon>
                                <FiberManualRecordIcon />
                            </ListItemIcon>
                            <ListItemText primary={elm} />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <Paper className={classes.paper}>
                <Button 
                    fullWidth 
                    variant="outlined"
                    onClick={() => {setOpen(!open)}}
                >
                    Necessary documents
                </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {DOCUMENTS.map(elm => (
                        <ListItem button className={classes.nested} key={elm}>
                            <ListItemIcon>
                                <FiberManualRecordIcon/>
                            </ListItemIcon>
                            <ListItemText primary={elm} />
                        </ListItem>
                    ))}
                </List>
            </Collapse>
            </Paper>

            
            <div className={classes.div} >
                <Typography className={classes.bold}>
                    Location
                </Typography>

                <iframe
                src="https://maps.google.com/maps?q=msila&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                />
            </div>

            <Paper className={classes.paper}>
                <Typography className={classes.bold} color="textSecondary">
                    For more information contact us
                </Typography>
                <List component="div" disablePadding>
        
                        <ListItem button >
                            <ListItemText primary="TEL : 0666618339" primaryTypographyProps={{
                                color:"textSecondary"
                            }} inset/>
                        </ListItem>

                        <ListItem button  >
                            <ListItemText primary="EMAIL : ahmed_notary@yahoo.com" primaryTypographyProps={{
                                color:"textSecondary"
                            }} inset/>
                        </ListItem>
                
                </List>
            </Paper>
        </Container>
    );
}


