import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import Input from '../Input'
import IconButton from '../IconButton'

if (process.env.WEBPACK) { require('./_style.scss') }

export const Background = props => {

    const style = {
        backgroundImage: `url('${props.image}')`
    }

    return (
        <div className="background-image" style={style}>{props.children}</div>
    )
}


export const Card = props => {

    const { loader } = props

    return (
        <div className="card fadeIn animated" data-loader={loader}>
            {!loader && props.children}
            {loader && <div className="loader animated flash infinite slow" />}
        </div>
    )
}


export const CardGrid = props => {

    const { type } = props

    return (
        <div data-type={type} className={'card-grid fadeIn animated'}>
            {props.children}
        </div>
    )
}

export const CardBlock = props => {

    const { title } = props

    return (
        <span>
            {title && <div className="title">{title}</div>}
            {props.children}
        </span>
    )
}

export const CardErrors = props => {
    const { data } = props

    return (
        <>
            {data &&
                <div className="errors">
                    <ul>
                        {Object.keys(data).map((element, key) => <li key={key}>{data[element][0]}</li>)}
                    </ul>
                </div>
            }
        </>
    )
}

const RowList = props => {

    const [active, setActive] = useState(false)
    const [process, setProcess] = useState(false)
    const toggleActive = () => setActive(!active)
    const { id, name, email, phone, zone, discipline, athlete, age, sex, createAt, handlerDel } = props

    const handlerDelete = () => {
        setProcess(true)
        handlerDel({ id })
    }

    return (

        <div className="row" data-active={active} data-id={id}>

            <div className="title" >
                <div onClick={() => toggleActive()}>
                    <span data-type="left">{name}</span>
                    <span data-type="right">{moment(createAt.toDate()).format("DD/MM/YYYY")}</span>
                </div>
                <span data-type="action" onClick={() => handlerDelete()}>
                    <IconButton process={process} radio={30} icon='delete' />
                </span>
            </div>

            <div className="details">
                <Input type="read" title="Solicitante" data={name} />
                <Input type="read" title="Email" data={email} />
                <Input type="read" title="Teléfono" data={phone} />
                <Input type="read" title="Zona" data={zone} />
                <Input type="read" title="Disciplina" data={discipline} />
                <Input type="read" title="Atleta" data={athlete} />
                <Input type="read" title="Edad" data={`${age} Años`} />
                <Input type="read" title="Sexo" data={sex} />
            </div>

        </div>
    )
}

export const CardRowList = props => {

    const { list, handlerDel, setSort, loading } = props


    const handlerSort = e => {

        const element = e.target
        const parent = element.parentNode
        const all = parent.querySelectorAll('span')

        Object.keys(all).map(elm => {
            element != all[elm] ? all[elm].dataset.sort = '' : null
        })

        if (element.dataset.sort) {
            element.dataset.sort == 'desc' ? element.dataset.sort = 'asc' : element.dataset.sort = 'desc'
        } else {
            element.dataset.sort = 'desc'
        }

        if (element.getAttribute('name') == 'date') {
            const obj = { field: 'createAt', type: element.dataset.sort }
            setSort(obj)
        }

        if (element.getAttribute('name') == 'name') {
            const obj = { field: 'name', type: element.dataset.sort }
            setSort(obj)
        }

    }

    const rowList = list.map((element, key) => <RowList key={key} {...element} handlerDel={handlerDel} />)

    return (
        <div className="row-list" >
            <div className="row" data-type="title">
                <div className="title" >
                    <span name="name" data-type="left" onClick={e => handlerSort(e)}>nombre</span>
                    <span name="date" data-type="right" data-sort="desc" onClick={e => handlerSort(e)}>fecha</span>
                </div>
            </div>
            {rowList}
            <div className="loading" data-active={loading}>Loading</div>
        </div>
    )
}

export const CardTitleHeader = props => {
    const { buttonLeft, buttonRight, title, type } = props
    //type list margin bottom 0px
    return (
        <header type={type} className="fadeIn animated">
            {buttonLeft &&
                <div className="card-button left">
                    {buttonLeft}
                </div>
            }

            {buttonRight &&
                <div className="card-button right">
                    {buttonRight}
                </div>
            }

            <div className="info">
                {title && <h1>{title}</h1>}
            </div>
        </header>
    )
}

export const CardImageHeader = props => {

    const { image, type } = props

    const style = {
        backgroundImage: `url('${image}')`
    }

    return (
        <div className="header-image" data-type={type} style={style}></div>
    )

}

export const CardProfileHeader = props => {

    const {
        buttonLeft,
        buttonRight,
        name,
        lastName,
        doc,
        birthdate,
        category,
        number,
        ranking,
        img } = props

    const style = { 'backgroundImage': `url(/assets/img/profiles/${img})` }

    return (
        <header type="profile" className="fadeIn animated">

            {buttonLeft &&
                <div className="card-button left">
                    {buttonLeft}
                </div>
            }

            {buttonRight &&
                <div className="card-button right">
                    {buttonRight}
                </div>
            }

            <div className="info">
                {name && <h1>{name}</h1>}
                {lastName && <h2>{lastName}</h2>}
                {doc && <span>DOC - {doc}</span>}
                {birthdate && <span>{birthdate} - {moment().diff(moment(birthdate, 'DD/MM/YYYY'), "years")} años</span>}
                {category && <span className="orange">- {category} -</span>}
                {img && <div className="img" style={style}></div>}
                {number && <div className="number"> <span>{number}</span> </div>}
                <Input type="ranking-read" data={ranking} title="puntuación" />
            </div>
        </header>
    )
}
