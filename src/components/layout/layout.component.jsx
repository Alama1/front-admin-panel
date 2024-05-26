import { Fragment } from 'react'
import { useNavigate , Outlet } from 'react-router-dom'

import './layout.styles.scss'
import logo from '../../assets/logo.png'
import Kirby from 'components/kirby/kirby.component'
import Footer from 'components/footer/footer.component'

const Header = () => {

    const navigate = useNavigate()

    const gustavoHandle = () => {
        navigate('/gustavo')
    }

    const birthdayHandle = () => {
        navigate('/birthday-bot')
    }

    const consoleHandle = () => {
        navigate('/console')
    }

    const homeHandle = () => {
        navigate('/')
    }

    return(
        <Fragment>
            <div className='header'>
                <div className='nav-logo' onClick={homeHandle}>
                    <img src={logo} alt='logo' className='logo--img'/>
                    <p className='logo--text'>Admin panel</p>
                </div>
                <div className='nav'>
                    <div className='gustavo-nav--button' onClick={gustavoHandle} >
                        Gustavo
                    </div>
                    <div className='birthday-nav--button' onClick={birthdayHandle}>
                        Birthday bot
                    </div>
                    <div className='console-nav--button' onClick={consoleHandle}>
                        Console
                    </div>
                </div>
            </div>
            <Outlet/>
            <Kirby/>
            <Footer/>
        </Fragment>
    )
}

export default Header