import { Fragment, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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
  

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };

    useEffect(() => {
        setHamstersFacts([
            {title: 'Title 1', fact: 'Fact 1'},
            {title: 'Title 2', fact: 'Fact 2'},
            {title: 'Title 3', fact: 'Fact 3'},
            {title: 'Title 4', fact: 'Fact 4'},
            {title: 'Title 5', fact: 'Fact 5'},
            //TODO API
        ])
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
            > 
                <Box sx={{ ...modalStyle }}>
                <h2 id="parent-modal-title">Login</h2>
                <p id="parent-modal-description">
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
                </Box>
            </Modal>
            <Modal
                open={isSignUpModalOpen}
                onClose={closeSignUpModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            > 
                <Box sx={{ ...modalStyle }}>
                <h2 id="parent-modal-title">SignUp</h2>
                <p id="parent-modal-description">
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
                </Box>
            </Modal>
        </Fragment>
    )
}

export default Home
