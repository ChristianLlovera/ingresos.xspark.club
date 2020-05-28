import React from 'react'

if (process.env.WEBPACK) { require('./_style.scss') }

const TextButton = props => {

    const { name, id, onClick } = props

    const handlerAction = () => {
        onClick ? onClick() : null
    }

    return (
        <div className="text-button" id={id} onClick={() => handlerAction()}>
            {name}
        </div>
    )
}

export default TextButton