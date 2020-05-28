import React, { useEffect, useState } from 'react'
import IconButton from '../IconButton'
import trans from '../../Helpers/Translate'
import autosize from 'autosize'


if (process.env.WEBPACK) { require('./_style.scss') }

export const getData = () => {

    const inputs = document.querySelectorAll('[data-value]')
    const data = {}

    Object.keys(inputs).map(element => {
        data[inputs[element].name] = inputs[element].value
    })

    return data

}

export const resetInputs = () => {

    const inputs = document.querySelectorAll('[data-value]')

    Object.keys(inputs).map(element => {
        inputs[element].dataset.value = ''
        inputs[element].value = ''
    })

}

export const inputValue = name => {

    const input = document.querySelector(`[name=${name}]`)

    return input ? input.dataset.value : false

}

const Read = props => {

    const { title, data } = props

    return (
        <div className="input">
            <div className="title">
                <span>{trans(title)}</span>
            </div>
            <div className="data tres-puntos">{data}</div>
        </div>
    )

}

const Ranking = props => {

    const { data, title, type, name, onChange } = props
    const [value, setValue] = useState(Number(data))
    const items = []

    const handlerPlus = () => {//acción de subir cantidad
        onChange ? onChange() : null
        value < 10 ? setValue(parseInt(value) + 1) : null
    }

    const handlerLess = () => {//acción de bajar cantidad
        onChange ? onChange() : null
        value > 0 ? setValue(parseInt(value) - 1) : null
    }

    const percentage = (value, index) => {

        let result = 0

        if (value >= (index + 1)) {
            result = 100
        }

        if (!Number.isInteger(value)) {
            const split = String(value).split('.')
            const int = Number(split[0])
            const flt = Number(split[1])
            if (index == int) {
                result = flt * 10
            }
        }

        return `${result}%`

    }


    for (let i = 0; i < 10; i++) {
        const style = { '--bar-decimal': percentage(value, i) }
        items.push(<div key={i} className={"bar"} style={style} />)
    }


    return (
        <div className="ranking" type={type} name={name} data-value={value} >
            {type == "edit" &&
                <>
                    <span className="rank-button less-button">
                        <IconButton type="border" radio={30} icon="less" onClick={() => handlerLess()} />
                    </span>
                    <span className="rank-button plus-button">
                        <IconButton type="border" radio={30} icon="plus" onClick={() => handlerPlus()} />
                    </span>
                </>

            }

            <div className="title">
                <span>{trans(title)}</span>
                <span>{value ? value : 0}/10</span>
            </div>
            <div className="items">{items}</div>
        </div>
    )
}

const Text = props => {

    const { title, name, data, placeholder, onChange } = props

    const handleChange = () => {
        onChange ? onChange() : null
        const input = document.querySelector(`input[name=${name}]`)
        input.dataset.value = input.value
        if (input.parentNode.dataset.error) {
            input.parentNode.dataset.error = false
        }
    }

    useEffect(() => {
        const input = document.querySelector(`input[name=${name}]`)
        if (data) { input.value = data }
    }, [])

    return (
        <div className="input">
            <div className="title">
                <span>{trans(title)}</span>
            </div>
            <input type="text" name={name}
                placeholder={placeholder}
                onChange={() => handleChange()}
                data-value={data} />
        </div>
    )

}

const Password = props => {

    const { title, name, data, placeholder, onChange } = props

    const handleChange = () => {
        onChange ? onChange() : null
        const input = document.querySelector(`input[name=${name}]`)
        input.dataset.value = input.value
        if (input.parentNode.dataset.error) {
            input.parentNode.dataset.error = false
        }
    }

    useEffect(() => {
        const input = document.querySelector(`input[name=${name}]`)
        if (data) { input.value = data }
    }, [])

    return (
        <div className="input">
            <div className="title">
                <span>{trans(title)}</span>
            </div>
            <input type="password" name={name}
                placeholder={placeholder}
                onChange={() => handleChange()}
                data-value={data} />
        </div>
    )

}


const Num = props => {

    const { title, name, data, placeholder, onChange } = props



    const handlerKey = e => {
        const isNumber = /^[0-9]/g

        if (e.key != 'Backspace') {
            if (!isNumber.test(e.key)) {
                e.preventDefault()
            }
        }

    }

    const handleChange = () => {
        onChange ? onChange() : null
        const input = document.querySelector(`input[name=${name}]`)
        input.dataset.value = Number(input.value)
        if (input.parentNode.dataset.error) {
            input.parentNode.dataset.error = false
        }
    }

    useEffect(() => {
        const input = document.querySelector(`input[name=${name}]`)
        if (data) { input.value = Number(data) }

    }, [])

    return (
        <div className="input">
            <div className="title">
                <span>{trans(title)}</span>
            </div>
            <input type="number"
                autoComplete='new-number'
                name={name}
                placeholder={placeholder}
                onKeyDown={e => handlerKey(e)}
                onChange={() => handleChange()}
                data-value={data} />
        </div>
    )

}

const Date = props => {

    const { title, name, data, onChange } = props

    const handleChange = () => {
        onChange ? onChange() : null
        const input = document.querySelector(`input[name=${name}]`)

        const date = input.value.split('-')
        input.dataset.value = `${date[2]}/${date[1]}/${date[0]}`

        if (input.parentNode.dataset.error) {
            input.parentNode.dataset.error = false
        }

    }

    useEffect(() => {
        const input = document.querySelector(`input[name=${name}]`)
        const date = data.split('/')
        if (date[2]) {
            input.value = `${date[2]}-${date[1]}-${date[0]}`
        }
    }, [])

    return (
        <div className="input">
            <div className="title">
                <span>{trans(title)}</span>
            </div>
            <input type="date" name={name} onChange={() => handleChange()} data-value={data} />
        </div>
    )

}

const TextArea = props => {

    const { title, name, data, placeholder, onChange } = props

    const handleChange = () => {
        onChange ? onChange() : null
        const input = document.querySelector(`[name=${name}]`)
        input.dataset.value = input.value

        if (input.parentNode.dataset.error) {
            input.parentNode.dataset.error = false
        }
    }

    useEffect(() => {
        const input = document.querySelector(`[name=${name}]`)
        if (data) { input.value = data }
        autosize(input)
    }, [])

    return (
        <div className="input">
            <div className="title">
                <span>{trans(title)}</span>
            </div>
            <textarea
                name={name}
                placeholder={placeholder}
                onChange={() => handleChange()}
                data-value={data} />
        </div>
    )

}

const List = props => {

    const { title, name, data, options, placeholder, onChange } = props


    const handleChange = () => {
        onChange ? onChange() : null
        const input = document.querySelector(`[name=${name}]`)
        input.dataset.value = input.value

        if (input.parentNode.dataset.error) {
            input.parentNode.dataset.error = false
        }
    }

    return (
        <div className="input">
            <div className="title">
                <span>{trans(title)}</span>
            </div>

            <select name={name} defaultValue={data} onChange={() => handleChange()} data-value={data}>
                <option value=''>--{placeholder}--</option>
                {options.map((element, key) => <option key={key} value={element.value}>{element.name}</option>)}
            </select>
        </div>
    )

}

export const Input = props => {

    const { title, data, options, type, placeholder, name, onChange } = props

    return (

        <>
            {type == "read" && <Read title={title} data={data} />}
            {type == "text" && <Text title={title} name={name} data={data} onChange={onChange} placeholder={placeholder} />}
            {type == "password" && <Password title={title} name={name} data={data} onChange={onChange} placeholder={placeholder} />}
            {type == "number" && <Num title={title} name={name} data={data} onChange={onChange} placeholder={placeholder} />}
            {type == "date" && <Date title={title} name={name} data={data} onChange={onChange} />}
            {type == "text-area" && <TextArea title={title} name={name} data={data} onChange={onChange} placeholder={placeholder} />}
            {type == "list" && <List title={title} name={name} data={data} options={options} onChange={onChange} placeholder={placeholder} />}
            {type == "ranking-read" && <Ranking type="read" title={title} data={data} />}
            {type == "ranking-edit" && <Ranking type="edit" title={title} name={name} data={data} onChange={onChange} />}
        </>

    )
}

export default Input