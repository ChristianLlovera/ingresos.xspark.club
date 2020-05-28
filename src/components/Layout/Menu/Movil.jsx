import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icons from '../Icons'
import useStore from '../../Store/useStore'

if (process.env.WEBPACK) { require('./_style.scss') }

const Button = props => {

    const { setMenu } = useStore()
    const { to } = props

    const LocalUrl = props => {
        const { to, icon, name, type } = props
        return (
            <Link to={to} data-type={type} className="button" onClick={() => setMenu()}>
                <Icons type={icon} />
                <span>{name}</span>
            </Link>
        )
    }

    const RemoteUrl = props => {

        const { to, icon, name, type } = props

        return (
            <a href={to} data-type={type} className="button" onClick={() => setMenu()}>
                <Icons type={icon} />
                <span>{name}</span>
            </a>
        )
    }

    const Element = props => {

        const { local } = props

        return (
            local ? <LocalUrl {...props} />
                : <RemoteUrl {...props} />
        )
    }

    const List = props => {
        const { name, items } = props
        const [status, setStatus] = useState(false)

        const handlerStatus = () => {
            setStatus(!status)
        }

        return (
            <>
                <div className="button" data-active={status} onClick={() => handlerStatus()}>
                    <Icons type="next" />
                    <span>{name}</span>
                </div>
                <div className="sub-button" data-active={status}>
                    {items.map((element, key) => <Element key={key} type="sub-button" {...element} />)}
                </div>
            </>
        )
    }


    return (
        to != undefined ? <Element {...props} />
            : <List {...props} />
    )
}

const MenuMovil = props => {

    const { getMenu, setMenu, getMenuList } = useStore()
    const menu = getMenu()
    const menuList = getMenuList()

    return (
        <>
            <div data-open={menu} className='menu-movil'>
                <header>
                    <div className="menu-button" onClick={() => setMenu()}>
                        <Icons type='menu' />
                    </div>
                    <div className="logo"></div>
                </header>
                <div className="body scroll">
                    {menuList.map((element, key) =>
                        <Button
                            key={key}
                            icon={element.icon}
                            name={element.name}
                            to={element.to}
                            local={element.local}
                            items={element.items}
                        />
                    )}
                </div>
            </div>

            <div data-open={menu} className='bg-menu-movil' onClick={() => setMenu()} />
        </>
    )
}

export default MenuMovil