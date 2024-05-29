import './gustavo.styles.scss'
import AccordionComponent from './settingsAccordion/settingsAccordion.component'

const Gustavo = () => {
    const reactionGifs = 
        <div>
            Reaction gif content
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