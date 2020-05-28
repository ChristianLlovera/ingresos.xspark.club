import React from 'react'


if (process.env.WEBPACK) { require('./_style.scss') }


const Footer = props => {

    return (
        <div className="footer">
            <div className="copy">ingresos.xspark.club <span>| 2020</span></div>
        </div>
    )
}

export default Footer