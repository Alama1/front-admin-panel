import './footer.styles.scss'
import githubIcon from 'assets/github.svg'
import linkedInIcon from 'assets/linkedin.svg'
import siteLogo from 'assets/logo-black.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='socials'>
                <img className='line'/>
                <a href='https://github.com/Alama1' target='_blank'>
                    <img src={githubIcon} className='socialIcons'/>
                </a>
                <a href='https://www.linkedin.com/in/kuzhdenko-maxim-709904205/' target='_blank'>
                    <img src={linkedInIcon} className='socialIcons'/>
                </a>
                <img className='line'/>
            </div>
            <div className='footer-logo'>
                <img className='footer-icon' src={siteLogo}/>
                <div className='footer-text'>Admin panel</div>
            </div>
            <div className='footer-links'>
                <a className='footer-links--link'>
                    Legal Stuff
                </a>
                <div className='footer-links--separator'>
                    |
                </div>
                <a className='footer-links--link'>
                    Privacy Policy
                </a>
                <div className='footer-links--separator'>
                    |
                </div>
                <a className='footer-links--link'>
                    Manage cookies
                </a>
            </div>
        </div>
    )
}

export default Footer