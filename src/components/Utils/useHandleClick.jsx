import { useState, useEffect, useRef } from 'react'

export const useHandleClick = () => {

    const node = useRef()
    const [onClick, setOnClick] = useState(false)

    const handleClick = (e) => {
        if (node.current) {
            if (node.current.contains(e.target)) { return }
            setOnClick(true)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClick)
        return () => { document.removeEventListener('mousedown', handleClick) }
    }, [])

    return { node, onClick, setOnClick }

}

export default useHandleClick