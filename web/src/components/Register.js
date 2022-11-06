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
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export const Register = ({ loggedIn, setloggedIn }) => {

    useEffect(() => {
        document.title = "React App | Register"
    }, [])

    const classes = useStyles();
    const navigate = useNavigate();

    const [signupData, setsignupData] = useState({ name: "", email: "", password: "" })

    const [visible, setvisible] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setsignupData({ ...signupData, [name]: value })
    }

    const handleSubmit = async (e) => {
        setvisible(true)
        e.preventDefault();
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, {
                method: 'POST',
                body: JSON.stringify(signupData),
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
                    Sign up
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                onChange={(e) => handleChange(e)}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={(e) => handleChange(e)}
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={(e) => handleChange(e)}
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    {!visible && <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>}
                    {visible && <Loading size={35}/>}
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={() => navigate("/")} style={{ cursor: "pointer" }} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}