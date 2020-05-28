import React from 'react'
import Icons from '../Icons'
import useStore from '../../Store/useStore'


if (process.env.WEBPACK) { require('./_style.scss') }

const Header = props => {

    const { setMenu } = useStore()


    return (
        <div className="header">
            <div className="logo-content">
                <div className="menu-button" onClick={() => setMenu()}>
                    <Icons type='menu' />
                </div>
                <div className="logo"></div>
            </div>
            {props.children}
        </div>
    )
}

export default Header