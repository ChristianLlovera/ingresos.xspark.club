import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Redirect } from 'react-router-dom'
import { middlewareProvider } from './_middlewares'
import { Card } from '../Layout/Card'


const handlerActions = async obj => {

    const { actions, params } = obj

    if (actions) {

        for (const action of actions) {

            const trigger = middlewareProvider[action]

            const redirect = await trigger(params)

            if (redirect) {
                return redirect
            }
        }

    }

    return false
}


const Middleware = props => {

    const { actions } = props
    const [component, setComponent] = useState()
    const params = useParams()

    useEffect(() => {

        setComponent(<Card loader={true} />)

        handlerActions({ actions, params }).then(res => {
            res ?
                setComponent(<Redirect to={res} />) :
                setComponent(props.children)
        })


    }, [props.children])

    return (<>{component}</>)

}

export default Middleware 