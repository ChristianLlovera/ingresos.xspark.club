import React from 'react'

if (process.env.WEBPACK) { require('./_style.scss') }

const Icons = props => {

    const { type, size } = props

    const style = {
        width: `${size}px`,
        height: `${size}px`
    }

    return (
        <i style={style} className={`icon_type-${type}`} />
    )
}

export default Icons