import './gustavo.styles.scss'
import AccordionComponent from './settingsAccordion/settingsAccordion.component'

import { useState, useEffect } from 'react' 

const Gustavo = () => {
    const [globalGifs, setGlobalGifs] = useState([])
    const [personalGifs, setPersonalGifs] = useState({})
    const [users, setUsers] = useState([])
    const [globalReactionChance, setGlobalReactionChance] = useState(0)
    const [personalReactionChance, setPersonalReactionChance] = useState(0)
    const [globalGreenLightUp, setGlobalGreenLightUp] = useState(false)

    useEffect(() => {
        getServerGifs()
        getReactionChances()
    }, [])

    const getServerGifs = async () => {
        const updateRes = await fetch(`http://${process.env.REACT_APP_BACKEND_IP}/gustavoGifs`, { 
            method: 'GET', 
            headers: {
                'Access-Control-Allow-Origin': `http://${process.env.REACT_APP_BACKEND_IP}`,
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`

            }
        });
        const response = await updateRes.json()
        setGlobalGifs(response.message.global)
        setPersonalGifs(response.message.personal)
    }

    const getReactionChances = async () => {
        const updateRes = await fetch(`http://${process.env.REACT_APP_BACKEND_IP}/reactionChances`, { 
            method: 'GET', 
            headers: {
                'Access-Control-Allow-Origin': `http://${process.env.REACT_APP_BACKEND_IP}`,
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

        const updateRes = await fetch(`http://${process.env.REACT_APP_BACKEND_IP}/reactionChance`, { 
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': `http://${process.env.REACT_APP_BACKEND_IP}`,
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ type: reactionType, gifChance: reactionChance })
        });
        
        const response = await updateRes.json()

        if (response.success) {
            setGlobalGreenLightUp(true)
            console.log('Setting green')
            setTimeout(() => {
                setGlobalGreenLightUp(false)
                console.log('Unsetting green')
            }, 1000);
        } else {
            alert('No')
        }
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
                <div className='add-reaction-gif-button'>
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
                <div className='add-reaction-gif-button'>
                    Add a new personal gif
                </div>
            </div>
        </div>

    const avatars = 
        <div>
            Avatars content
        </div>

    return (
        <div className='gustavo'>
            <div className='gustavo--body'>
                <div className='settings'>
                    <AccordionComponent title='Reaction gifs' content={reactionGifs}></AccordionComponent>
                    <AccordionComponent title='Avatars' content={avatars}></AccordionComponent>
                </div>
            </div>
        </div>
    )
}

export default Gustavo