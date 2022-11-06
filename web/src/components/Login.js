import React, { useState,useEffect } from 'react';
import { Button, TextField, Link, Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';

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

export const Login = ({ loggedIn, setloggedIn }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [loginData, setloginData] = useState({ email: "", password: "" })

    const [visible, setvisible] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setloginData({ ...loginData, [name]: value })
    }

    useEffect(() => {
        document.title = "React App | Login"
    }, [])

    const handleSubmit = async (e) => {
        setvisible(true)
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const response = await res.json()
            if (response.token) {
                localStorage.setItem("user", JSON.stringify(response))
                setloggedIn(true)
                setvisible(false)
                toast.success("Success", {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored'
                });
                setTimeout(() => {
                    navigate("/home")
                }, 1000);
            } else {
                setvisible(false)
                toast.error(response.message, {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored'
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={(e) => handleChange(e)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(e) => handleChange(e)}
                        autoComplete="current-password"
                    />
                    {!visible && <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>}
                    {visible && <Loading size={35}/>}
                    <Grid container>
                        <Grid item>
                            <Link onClick={() => navigate("/register")} style={{ cursor: "pointer" }} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}