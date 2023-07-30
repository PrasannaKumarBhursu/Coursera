import {Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config.js";
import axios from "axios";


export const Landing = () => {
    const navigate = useNavigate()

    const [userEmail, setUserEmail] = useState(null);
    

    const init = async() => {
        const token = localStorage.getItem("token")
        
        console.log(token);
        if(token && token !== "null"){
            const response = await axios.get(`${BASE_URL}/admin/me`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
    
            if (response.data.username) {
                setUserEmail(response.data.username)
            }

        }
        
    };

    useEffect(() => {
       init();
    }, []);

    console.log(userEmail);



    return <div>
        <Grid container style={{padding: "5vw"}}>
            <Grid item xs={12} md={6} lg={6}>
                <div style={{marginTop: 100}}>
                    <Typography variant={"h2"}>
                        Coursera Admin
                    </Typography>
                    <Typography variant={"h5"}>
                        A place to learn, earn and grow
                    </Typography>

                    {! userEmail && <div style={{display: "flex", marginTop: 20}}>
                        <div style={{marginRight: 10}}>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/signup")
                                }}
                            >Signup</Button>
                        </div>
                        <div>
                            <Button
                                size={"large"}
                                variant={"contained"}
                                onClick={() => {
                                    navigate("/signin")
                                }}
                            >Signin</Button>
                        </div>
                    </div>}
                </div>
                <div>
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6}  style={{marginTop: 20}}>
                <img alt="teaching pic" src={"/class.jpeg"} width={"100%"} />
            </Grid>
        </Grid>
    </div>
}