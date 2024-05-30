import './gustavo.styles.scss'
import AccordionComponent from './settingsAccordion/settingsAccordion.component'

import { useState, useEffect } from 'react' 

const Gustavo = () => {
    const [globalGifs, setGlobalGifs] = useState([])
    const [personalGifs, setPersonalGifs] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        setGlobalGifs([
            'https://cdn.discordapp.com/attachments/201232821103099904/1235913314954121267/5337076127519228446.gif?ex=6659b1f8&is=66586078&hm=ff2d4d765ea6cd2e5727c530e943b67393fe644bfb11db866e66471205f72b61&', 
            'https://cdn.discordapp.com/attachments/398082454532915201/1242443534615711764/Clipchamp.gif?ex=6659b8b6&is=66586736&hm=134549fc6dd472eb52de1ab58cc0be7f45b2d7752ba8176b99a95b4ab1a609b2&',
            'https://media1.tenor.com/m/e725ChiJpTMAAAAd/nerd-cube.gif',
            'https://cdn.discordapp.com/attachments/398082454532915201/1242443534615711764/Clipchamp.gif?ex=6659b8b6&is=66586736&hm=134549fc6dd472eb52de1ab58cc0be7f45b2d7752ba8176b99a95b4ab1a609b2&',
            'https://cdn.discordapp.com/attachments/201232821103099904/1235913314954121267/5337076127519228446.gif?ex=6659b1f8&is=66586078&hm=ff2d4d765ea6cd2e5727c530e943b67393fe644bfb11db866e66471205f72b61&'
        ])

        setPersonalGifs({
            "Oleg<>321451212215": ['https://media1.tenor.com/m/e725ChiJpTMAAAAd/nerd-cube.gif', 'https://media1.tenor.com/m/e725ChiJpTMAAAAd/nerd-cube.gif', 'https://media1.tenor.com/m/e725ChiJpTMAAAAd/nerd-cube.gif'],
            "Natasha<>12451204321": ['https://media1.tenor.com/m/e725ChiJpTMAAAAd/nerd-cube.gif', 'https://media1.tenor.com/m/e725ChiJpTMAAAAd/nerd-cube.gif', 'https://media1.tenor.com/m/e725ChiJpTMAAAAd/nerd-cube.gif'],
            "Anton<>12467182621": ['https://media1.tenor.com/m/e725ChiJpTMAAAAd/nerd-cube.gif', 'https://media1.tenor.com/m/e725ChiJpTMAAAAd/nerd-cube.gif', 'https://media1.tenor.com/m/e725ChiJpTMAAAAd/nerd-cube.gif']
        })
    }, [])

    const reactionGifs = 
        <div className='reaction-gifs'>
            <div className='reaction-gifs--global'>
                <div className='global-gif--header'>
                    <div>
                        Global gifs
                    </div>
                    <div>
                        Chance:
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