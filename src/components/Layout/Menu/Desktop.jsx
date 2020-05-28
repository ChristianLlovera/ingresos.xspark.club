import React from 'react'
import { Link } from 'react-router-dom'
import Icons from '../Icons'
import useStore from '../../Store/useStore'



const Button = props => {

    const { setMenu } = useStore()
    const { to } = props

    const LocalUrl = props => {
        const { to, name } = props
        return (
            <Link to={to} className="button">{name}</Link>
        )
    }

    const RemoteUrl = props => {

        const { to, name } = props

        return (
            <a href={to} className="button" >{name}</a>
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


        return (
            <div className="button" data-list={true}>
                <span>{name}</span>
                <Icons type="bottom" />
                <div className="sub-list">
                    {items.map((element, key) => <Element key={key} {...element} />)}
                </div>
            </div>
        )
    }


    return (
        to != undefined ? <Element {...props} />
            : <List {...props} />
    )

}

const MenuDesktop = props => {

    const { getMenuList } = useStore()
    const menuList = getMenuList()

    return (
        <div className="menu-desktop">
            {menuList.map((element, key) =>
                <Button
                    key={key}
                    name={element.name}
                    to={element.to}
                    local={element.local}
                    items={element.items}
                />
            )}
        </div>
    )
}

export default MenuDesktop