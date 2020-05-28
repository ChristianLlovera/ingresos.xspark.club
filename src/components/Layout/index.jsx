import React, { useEffect } from 'react'
import MenuMovil from './Menu/Movil'
import MenuDesktop from './Menu/Desktop'
import Header from './Header'
import Footer from './Footer'

if (process.env.WEBPACK) { require('./_style.scss') }

const Layout = props => {

    return (
        <div className="content">
            <MenuMovil />
            <Header>
                <MenuDesktop />
            </Header>
            <div className="body scroll">
                {props.children}
            </div>
            <Footer />
        </div>
    )
}


export default Layout
