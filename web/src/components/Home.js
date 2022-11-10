import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Home() {

    const classes = useStyles();
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(true) // localStorage.getItem("user") ? true : false

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/logout`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isLoggedIn: false
                }),
            })
            .then(res => res.json())
        } catch (err) {
            console.log(err)
        }
        setIsLoggedIn(false)
        localStorage.removeItem("user")
        setTimeout(() => {
            navigate("/")
        }, 1000);
    }
        

    return (
        <div className='Home'>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
            >
                Logout
            </Button>
            
        </div >
    );
}