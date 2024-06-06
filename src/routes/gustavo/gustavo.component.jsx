import './gustavo.styles.scss'
import AccordionComponent from './settingsAccordion/settingsAccordion.component'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';


import { useState, useEffect, Fragment } from 'react' 

const Gustavo = () => {
    const [globalGifs, setGlobalGifs] = useState([])
    const [personalGifs, setPersonalGifs] = useState({})
    const [users, setUsers] = useState([])
    const [globalReactionChance, setGlobalReactionChance] = useState(0)
    const [personalReactionChance, setPersonalReactionChance] = useState(0)
    const [globalGreenLightUp, setGlobalGreenLightUp] = useState(false)
    const [isAddGifModalOpen, setIsAddGifModalOpen] = useState(false)
    const [autocompleteUser, setAutocompleteUser] = useState({})
    const [previewURL, setPreviewURL] = useState('')

    useEffect(() => {
        getServerGifs()
        getReactionChances()
        getUsers()
    }, [])

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

    const getUsers = async () => {
        const updateRes = await fetch(`https://${process.env.REACT_APP_BACKEND_IP}/users`, { 
            method: 'GET', 
            headers: {
                'Access-Control-Allow-Origin': `https://${process.env.REACT_APP_BACKEND_IP}`,
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`

            }
        });

        const response = await updateRes.json()

        if (response.success) {
            const refactoredUsers = [{ label: 'EVERYONE', id: 'everyone' }]
            for (const [id, username] of Object.entries(response.message)) {
                refactoredUsers.push({ label: username, id })
            }
            setUsers(refactoredUsers)
        } else {
            setUsers([{label: 'Error', id: 'None'}])
        }

    }

    const getServerGifs = async () => {
        const updateRes = await fetch(`https://${process.env.REACT_APP_BACKEND_IP}/gustavoGifs`, { 
            method: 'GET', 
            headers: {
                'Access-Control-Allow-Origin': `https://${process.env.REACT_APP_BACKEND_IP}`,
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`

            }
        });

        const response = await updateRes.json()
        if (!response.success) {
            setPersonalGifs({ "Pls<>123": ['https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg', 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg'], 'log<>123': ['https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg', 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg', 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg'], 'in<>123': ['https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg', 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg'] })
            setGlobalGifs(['https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg', 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg', 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg', 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg'])
        } else {
            setGlobalGifs(response.message.global)
            setPersonalGifs(response.message.personal)
        }   
    }

    const getReactionChances = async () => {
        const updateRes = await fetch(`https://${process.env.REACT_APP_BACKEND_IP}/reactionChances`, { 
            method: 'GET', 
            headers: {
                'Access-Control-Allow-Origin': `https://${process.env.REACT_APP_BACKEND_IP}`,
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`

            }
        });

        const response = await updateRes.json()
        setGlobalReactionChance(response.message.gifChance)
        setPersonalReactionChance(response.message.personalGifChance)
    }

    const onReactionChanceChange = async (e) => {
        let reactionChance = parseFloat(e.target.value)
        if (!reactionChance) return
        reactionChance = reactionChance > 100 ? 100 : reactionChance
        const reactionType = e.target.id

        const updateRes = await fetch(`https://${process.env.REACT_APP_BACKEND_IP}/reactionChance`, { 
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': `https://${process.env.REACT_APP_BACKEND_IP}`,
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ type: reactionType, gifChance: reactionChance })
        });
        
        const response = await updateRes.json()

        if (response.success) {
            setGlobalGreenLightUp(true)
            setTimeout(() => {
                setGlobalGreenLightUp(false)
                console.log('Unsetting green')
            }, 1000);
        } else {
            alert(response.message)
        }
    }

    const closeAddGifModal = () => {
        setIsAddGifModalOpen(false)
    }

    const handleAddGif = async () => {
        const updateRes = await fetch(`https://${process.env.REACT_APP_BACKEND_IP}/addReactionGif`, { 
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': `https://${process.env.REACT_APP_BACKEND_IP}`,
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ user: autocompleteUser.id, url: previewURL })
        });
        
        const response = await updateRes.json()

        if (response.success) {
            alert(JSON.stringify(response.message))
            closeAddGifModal()
        } else {
            alert(JSON.stringify(response.message))
        }
    }

    const openModal = () => {
        setIsAddGifModalOpen(true)
    }

    const gifPreview = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        const url = data.get('gifURL')
        setPreviewURL(url)
        console.log(url)
        console.log(autocompleteUser.id)
    }

    const reactionGifs = 
        <div className='reaction-gifs'>
            <div className='reaction-gifs--global'>
                <div className='global-gif--header'>
                    <div>
                        Global gifs
                    </div>
                    <div className='reaction-chance'>
                        Chance:
                        <input id='global' className='reaction-chance--chance' onBlur={onReactionChanceChange} placeholder={globalReactionChance}
                            style={{
                                background: globalGreenLightUp ? 'green' : 'transparent',
                                transition: 'background-color 0.3s ease'
                            }}
                        />
                        %
                    </div>
                </div>
                <div className='global-gifs--elements'>
                    {globalGifs.map((element) => {
                        return <div>
                            <img alt='reaction gif' className='global-reaction-gif' src={element}/>
                        </div>
                    })}
                </div>
                <div className='add-reaction-gif-button' onClick={openModal}>
                    Add a new global gif
                </div>
            </div>
            <hr style={{width: '100%'}}/>
            <div className='reaction-gifs--personal'>
                <div className='personal-gif--header'>
                    <div>
                        Personal gifs
                    </div>
                    <div>
                        Chance:
                    </div>
                </div>
                <div className='personal-gifs--elements'>
                    {
                        Object.entries(personalGifs).map(([key, value]) => {
                            return <div className='personal-gips-container'>
                                <div className='personal-gif-element'>
                                    <div className='personal-gif--username'>
                                        {key.split('<>')[0]}
                                    </div>
                                    <div className='personal-gif--gifs'>
                                        {value.map((element) => {
                                            return <img alt='personal gif' className='personal-gif--gif' src={element}/>
                                        })}
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className='add-reaction-gif-button' onClick={openModal}>
                    Add a new personal gif
                </div>
            </div>
        </div>

    const avatars = 
        <div>
            Avatars content
        </div>

    return (
        <Fragment>
            <div className='gustavo'>
                <div className='gustavo--body'>
                    <div className='settings'>
                        <AccordionComponent title='Reaction gifs' content={reactionGifs}></AccordionComponent>
                        <AccordionComponent title='Avatars' content={avatars}></AccordionComponent>
                    </div>
                </div>
            </div>
            <Modal
            open={isAddGifModalOpen}
            onClose={closeAddGifModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            > 
                <Box sx={{ ...modalStyle }}>
                    <Typography component="h1" variant="h5">
                        Add a gif
                    </Typography>
                    <Box component="form" noValidate onSubmit={gifPreview} sx={{ mt: 1 }}>
                        <Autocomplete
                            margin="normal"
                            required
                            fullWidth
                            id="userID"
                            label="Discord user"
                            name="userID"
                            onChange={(event, newValue) => {
                                setAutocompleteUser(newValue)
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            renderInput={(params) => <TextField {...params} label="User" />}
                            options={users}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="gifURL"
                            label="Gif URL"
                            type="URL"
                            id="URL"
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Preview
                        </Button>
                    </Box>
                    {
                        previewURL.length ? 
                        <div className='send-gif--button'>
                            <img src={previewURL} style={{ width: '90%' }} alt='Preview'/>
                            <Button
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                                variant="contained"
                                onClick={handleAddGif}
                            >
                                Add
                            </Button>
                        </div> : null
                    }
                </Box>
            </Modal>
        </Fragment>
    )
}

export default Gustavo