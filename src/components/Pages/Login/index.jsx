import React, { useState } from 'react'
import { Card, CardGrid, CardBlock, CardTitleHeader, CardErrors } from '../../Layout/Card'
import { Input, getData } from '../../Layout/Input'
import TextButton from '../../Layout/TextButton'
import { handlerLogin } from '../../Handlers/handlersLogin'
import { useHistory } from 'react-router-dom'

if (process.env.WEBPACK) { require('./_style.scss') }

const Auth = props => {

    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [err, setErr] = useState()
    const dep = { getData, setLoading, setData, setErr, history }


    return (
        <Card loader={loading}>
            <CardTitleHeader title="Login" type="list" />
            <div className="info" data-type="gray">
                <p>Coloca tu usuario y contraseña para iniciar sesión.</p>
            </div>

            <br />

            <CardGrid type='center'>
                <CardBlock>
                    <Input type='text' data={data.email} title='Correo Electrónico' name='email' placeholder='Escribe tu Correo Electrónico' />
                    <Input type='password' title='Contraseña' name='password' placeholder='Escribe tu Contraseña' />
                </CardBlock>
            </CardGrid>

            <CardErrors data={err} />

            <CardGrid type='center'>
                <CardBlock>
                    <TextButton name='Login' onClick={() => handlerLogin(dep)} />
                </CardBlock>
            </CardGrid>
        </Card>
    )
}

export default Auth
