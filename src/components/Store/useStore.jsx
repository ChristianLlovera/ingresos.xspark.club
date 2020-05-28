import { useContext } from 'react'
import { StoreContext } from './'

export const useStore = () => {

    const [Store, setStore] = useContext(StoreContext)
    const [State] = Store

    const getMenu = () => {
        const state = { ...State }
        const { menu } = state
        return menu
    }

    const setMenu = data => {
        const menu = getMenu()
        State.menu = !menu
        setStore([State])
    }

    const getMenuList = () => {
        const state = { ...State }
        const { menuList } = state
        return menuList
    }

    return {
        getMenuList,
        getMenu,
        setMenu
    }
}

export default useStore