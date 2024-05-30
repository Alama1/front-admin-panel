import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';

import './settingsAccordion.styles.scss'


const AccordionComponent = ({title, content}) => {
    return (
        <Accordion className='settings-accordion--body'
            sx={{backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: '8px'}}
        >
            <AccordionSummary 
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1-content"
                sx={{display: 'flex'}}
            >
                <div className='title'>
                    <Typography 
                        sx={
                            {
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            fontWeight: '500',
                            fontSize: '24px',
                            color: 'rgba(255, 255, 255, 0.5)',
                            paddingLeft: '2vw'
                        }}>
                        {title}
                    </Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    <div className='content'>
                        {content}
                    </div>
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default AccordionComponent