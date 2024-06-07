import { Fragment, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


import meme from 'assets/meme.png'
import triangle from 'assets/backgroundTriangle.png'
import cylinder from 'assets/backgroundCylinder.png'
import decorativeLine from 'assets/decorativeLine.png'
import cat1 from 'assets/cat1.gif'
import cat2 from 'assets/cat2.gif'
import './home.styles.scss'
import AccordionComponent from 'components/accordion/accordion.component';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [hamstersFacts, setHamstersFacts] = useState([{title: 'Error', fact: 'Pls reload you page'}])
    const [isSuccessAlertShown, setIsSuccessAlertShown] = useState(false)
    const [isFailureAlertShown, setIsFailureAlertShown] = useState(false)
    const [successAlertText, setSuccessAlertText] = useState('')
    const [failureAlertText, setFailureAlertText] = useState('')

    const openLoginModal = () => {
      setIsLoginModalOpen(true);
    };
    const closeLoginModal = () => {
      setIsLoginModalOpen(false);
    };
    const openSignUpModal = () => {
        setIsSignUpModalOpen(true);
    };
    const closeSignUpModal = () => {
        setIsSignUpModalOpen(false);
    };
  
    async function handleRegistration(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        const username = data.get('username');
        try {
            const loginRes = await fetch(`${process.env.REACT_APP_BACKEND_IP}/signup`, { 
                method: 'POST', 
                headers: {
                    'Access-Control-Allow-Origin': `${process.env.REACT_APP_BACKEND_IP}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, username }) 
            });
            const response = await loginRes.json()
            
            if (response.success) {
                setIsLoggedIn(true)
                localStorage.setItem('token', response.message.token)
                setIsSuccessAlertShown(true)
                setSuccessAlertText('Sign in success!')
                setTimeout(() => {
                    closeSignUpModal()
                    setIsSuccessAlertShown(false)
                }, 2000)
            } else {
                setIsFailureAlertShown(true)
                setFailureAlertText(response.message)
                setTimeout(() => {
                    setIsFailureAlertShown(false)
                }, 5000)
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function handleAuth(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
    
        try {
            const loginRes = await fetch(`${process.env.REACT_APP_BACKEND_IP}/login`, { 
                method: 'POST', 
                headers: {
                    'Access-Control-Allow-Origin': `${process.env.REACT_APP_BACKEND_IP}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }) 
            });
            const response = await loginRes.json()
            
            if (response.success) {
                setIsLoggedIn(true)
                localStorage.setItem('token', response.message.token)
                setIsSuccessAlertShown(true)
                setSuccessAlertText('Sign in success!')
                setTimeout(() => {
                    closeLoginModal()
                    setIsSuccessAlertShown(false)
                }, 2000)
            } else {
                setIsFailureAlertShown(true)
                setFailureAlertText(response.message)
                setTimeout(() => {
                    setIsFailureAlertShown(false)
                }, 5000)
            }
        } catch (e) {
            console.log(e);
        }
    }

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: '8px',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',

      };

    async function updateToken(token) {
        const updateRes = await fetch(`${process.env.REACT_APP_BACKEND_IP}/updateToken`, { 
            method: 'GET', 
            headers: {
                'Access-Control-Allow-Origin': `${process.env.REACT_APP_BACKEND_IP}`,
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`

            }
        });
        const response = await updateRes.json()
        
        if (response.message === 'Token verification failed.') {
            localStorage.removeItem('token')
            return
        }
        if (response.message === 'Invalid token.') {
            localStorage.removeItem('token')
            return
        }
        if (response.message === 'Only tokens with less than 1 day lifetime can be extended.') {
            setIsLoggedIn(true)
            return
        }
        if (response.success) {
            setIsLoggedIn(true)
            localStorage.setItem('token', response.message.token)
        }
    }

    async function updateHamsterFacts() {
        const updateRes = await fetch(`${process.env.REACT_APP_BACKEND_IP}/hamster`, { 
            method: 'GET', 
            headers: {
                'Access-Control-Allow-Origin': `${process.env.REACT_APP_BACKEND_IP}`,
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`

            }
        });
        const response = await updateRes.json()
        setHamstersFacts(response.message.map((fact) => {
            return {
                title: fact.title,
                fact: fact.description
            }
        }))
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        updateHamsterFacts()
        if (token) {
            updateToken(token)
        }
    }, [])

    return (
        <Fragment>
            <div className='home'>
                <div className='home-blur'>
                    <p className='home-page--title'>
                            Admin panel for my server<br/>
                            and bots
                    </p>
                    {
                        !isLoggedIn ? 
                        <div className='auth-buttons'>
                        <div className='login-button' onClick={openLoginModal}>
                            <p>
                                Login
                            </p>
                        </div>
                        <div className='signUp-button' onClick={openSignUpModal}>
                            <p>
                                SignUp
                            </p>
                        </div>
                    </div> :
                    <div className='welcome-back--text'>
                        Welcome back!
                    </div>
                    }

                    <div className='meme' style={{backgroundImage: `url(${meme})`}}/>
                    <img alt='decorative line' className='decorative-line' src={decorativeLine}/>
                    <img alt='dancing cat' src={cat1} className='cat-first'/>
                    <img alt='sleeping cat' src={cat2} className='cat-second'/>
                </div>
                <div className='hamsters-facts--blur'>
                    <div className='hamsters-facts--page'>
                        <div className='hamsters-facts--title'>
                            5 Facts About Hamsters
                        </div>
                        <div className='hamsters-facts--accordions'>
                            {
                                hamstersFacts.map((fact, index) => {
                                    return <AccordionComponent index={index + 1} key={fact.title} content={fact.fact} title={fact.title} id={fact.title}/>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='blurred-things'>
                    <img alt='background cylinder' src={cylinder} className='cylinder--1'/>
                    <img alt='background cylinder' src={cylinder} className='cylinder--2'/>
                    <img alt='background triangle' src={triangle} className='triangle--1'/>
                </div>
            </div>

            <Modal
                open={isLoginModalOpen}
                onClose={closeLoginModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                className='login-modal'
            > 
                <Box sx={{ ...modalStyle }}>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    {
                        isSuccessAlertShown ?
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                            {successAlertText}
                        </Alert> : null
                    }
                    {
                        isFailureAlertShown ?
                        <Alert severity="error">
                            {failureAlertText}
                        </Alert> : null
                    }
                    <Box component="form" noValidate onSubmit={handleAuth} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={isSignUpModalOpen}
                onClose={closeSignUpModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            > 
                <Box sx={{ ...modalStyle }}>
                        <Typography component="h1" variant="h5">
                                Sign up
                        </Typography>
                        {
                            isSuccessAlertShown ?
                            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                                {successAlertText}
                            </Alert> : null
                        }
                        {
                            isFailureAlertShown ?
                            <Alert severity="error">
                                {failureAlertText}
                            </Alert> : null
                        }
                        <Box component='form' onSubmit={handleRegistration} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Username"
                                name="username"
                                autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                />
                            </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    />
                                </Grid> 
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                Sign Up
                            </Button>
                        </Box>
                </Box>
            </Modal>
        </Fragment>
    )
}

export default Home
