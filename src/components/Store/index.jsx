import React, { useState } from 'react'

const structure = {
    menu: false,
    menuList: [
        { name: 'home', to: 'https://xspark.club/', icon: 'next', local: false },
        { name: 'fútbol', to: 'https://xspark.club/futbol-xspark-academy/', icon: 'next', local: false },
        { name: 'baseball', to: 'https://xspark.club/baseball-xspark-academy/', icon: 'next', local: false },
        { name: 'karate', to: 'https://xspark.club/karate-xspark-academy/', icon: 'next', local: false },
        {
            name: 'cross training', items: [
                { name: 'bestrong', to: 'https://xspark.club/bestrong/', icon: 'next', local: false },
                { name: 'entrenamiento funcional', to: 'https://xspark.club/entrenamiento-funcional/', icon: 'next', local: false },
                { name: 'inscripción', to: 'https://xspark.club/training/planilla', icon: 'next', local: false }
            ]
        },
        {
            name: 'otros', items: [
                { name: 'eea', to: 'https://xspark.club/escuela-especializada-de-arqueros/', icon: 'next', local: false },
                { name: 'inscripción', to: 'https://xspark.club/academy/planilla', icon: 'next', local: false },
                { name: 'preguntas frecuentes', to: 'https://xspark.club/preguntas-frecuentes-academy/', icon: 'next', local: false },
                { name: 'cumpleaños', to: 'https://xspark.club/cumpleanos-xspark-club/', icon: 'next', local: false },
                { name: 'contactos', to: 'https://xspark.club/contactos/', icon: 'next', local: false }
            ]
        }
    ]
}

export const StoreContext = React.createContext({})

export const StoreProvider = props => {

    const [Store, setStore] = useState([structure])

    return (
        <StoreContext.Provider value={[Store, setStore]}>
            {props.children}
        </StoreContext.Provider>
    )
}

