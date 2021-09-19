import { useState } from "react"
import axios from "axios";
const serverUrl = "http://192.168.43.239:3000/auth/moussa";

export default (props) => {

    const [picture, setPicture] = useState("");
    
    const changeHnadler = (e) => {
        setPicture(e.target.files[0]);
    }

    const clickHandler = (e) => {
        // console.log(picture);
        let a = [
            {
                disc : "moussa",
                photo : ""
            },
            {
                name : "omar"
            },
            {
                name : "sara"
            }
        ];

        let fd = new FormData();
        fd.append('photos', picture, "discription........");
        fd.append('photos', picture, "discription.......22222.");
        
        console.log(fd.get('photo'));

        axios.post(serverUrl, fd)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <>
            <input type="file" onChange={changeHnadler}/>
            <button onClick={clickHandler}>
                click
            </button>
        </>
    )
}