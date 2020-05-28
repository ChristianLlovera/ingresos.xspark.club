import React, { useState, useEffect } from 'react'
import { Card, Background, CardTitleHeader, CardImageHeader, CardGrid, CardBlock, CardErrors } from '../../Layout/Card'
import { Input, getData } from '../../Layout/Input'
import TextButton from '../../Layout/TextButton'
import { handlerAddPetitions } from '../../Handlers/handlersHome'
import { Recaptcha } from '../../Auth'


if (process.env.WEBPACK) { require('./_style.scss') }


const Form = props => {

    const { data, err, save } = props

    const sexList = [
        { value: 'FEMENINO', name: 'Femenino' },
        { value: 'MASCULINO', name: 'Masculino' }
    ]

    const disciplinesList = [
        { value: 'BASEBALL', name: 'Baseball' },
        { value: 'FUTBOL', name: 'Fútbol' },
        { value: 'KARATE', name: 'Karate' }
    ]

    const zoneList = [
        { value: 'COSTA DEL ESTE', name: 'Costa del Este' },
        { value: 'COSTA SUR', name: 'Costa Sur' },
        { value: 'CLAYTON', name: 'Clayton' },
        { value: 'PUNTA PACIFICA', name: 'Punta Pacífica' }
    ]

    useEffect(() => {

        if (!save) { Recaptcha('recaptcha-container') }

    }, [])


    //     <div className="menu">
    //      <a href="https://xspark.club/karate-xspark-academy/" target="_blank">Karate</a>
    //      <a href="https://xspark.club/futbol-xspark-academy/" target="_blank">Fútbol</a>
    //      <a href="https://xspark.club/baseball-xspark-academy/" target="_blank">Baseball</a>
    //     </div>

    return (
        <>
            <CardImageHeader image="/assets/img/background.png" type="form" />
            <div className="header-custom-absolute-image"></div>
            <CardTitleHeader title="Xspark Academy" type="list" />

            <div className="info" data-type="gray">
                <p>Solo debes llenar este formulario y nosotros te contactaremos para darte toda la información sobre nuestros planes :)</p>
            </div>
            <br />
            <CardGrid type='center'>
                <CardBlock>
                    <Input type='text' data={data.name} title='Nombre Completo' name='name' placeholder='Escribe tu nombre completo' />
                    <Input type='number' data={data.phone} title='Teléfono' name='phone' placeholder='Escribe tu número de teléfono' />
                    <Input type='text' data={data.email} title='Correo Electrónico' name='email' placeholder='Escribe tu correo electrónico' />
                    <Input type='text' data={data.athlete} title='Nombre del Atleta' name='athlete' placeholder='Escribe el nombre del atleta' />
                    <Input type='number' data={data.age} title='Edad del Atleta' name='age' placeholder='Escribe la edad del atleta' />
                    <Input type='list' data={data.sex} options={sexList} title='Sexo del Atleta' name='sex' placeholder='-seleciona el sexo-' />
                    <Input type='list' data={data.discipline} options={disciplinesList} title='Disciplinas' name='discipline' placeholder='-seleciona una disciplina-' />
                    <Input type='list' data={data.zone} options={zoneList} title='Zonas' name='zone' placeholder='-seleciona una zona-' />
                    <div id='recaptcha-container'></div>
                </CardBlock>
            </CardGrid>

            <CardErrors data={err} />

            <CardGrid type='center'>
                <CardBlock>
                    <TextButton id='enviar' name='enviar' onClick={() => handlerAddPetitions({ ...props, getData })} />
                </CardBlock>
            </CardGrid>

        </>
    )
}

const Success = props => {
    const { setSave } = props
    return (
        <>
            <CardImageHeader image="/assets/img/success.svg" />
            <CardTitleHeader title="...HEMOS RECIBIDO TUS DATOS :)" type="list" />
            <div className="info" data-type="gray">
                <p>GRACIAS POR TU TIEMPO! YA HEMOS RECIBIDO TUS DATOS...TE CONTACTAREMOS CUANDO ESTEMOS DE VUELTA...</p>
            </div>
            <br />
            <CardGrid type='center'>
                <CardBlock>
                    <TextButton name='Ok!' onClick={() => setSave(false)} />
                </CardBlock>
            </CardGrid>
        </>
    )
}

const Home = props => {

    const [loading, setLoading] = useState(false)
    const [save, setSave] = useState(false)
    const [data, setData] = useState({})
    const [err, setErr] = useState()
    const dep = { data, setData, err, setErr, setLoading, save, setSave }

    return (

        <Background image="/assets/img/background.png" >
            <Card loader={loading}>
                {!save
                    ? <Form {...dep} />
                    : <Success setSave={setSave} />
                }
            </Card>
        </Background>

    )
}

export default Home