import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

import './layout.styles.scss'
import logo from '../../assets/logo.png'
import Kirby from 'components/kirby/kirby.component'
import Footer from 'components/footer/footer.component'

const Header = () => {

    return(
        <Fragment>
            <div className='header'>
                <div className='logo'>
                    <img src={logo} alt='logo' className='logo--img'/>
                    <p className='logo--text'>Admin panel</p>
                </div>
                <div className='nav'>
                    <div className='gustavo'>
                        Gustavo
                    </div>
                    <div className='birthday'>
                        Birthday bot
                    </div>
                    <div className='console'>
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