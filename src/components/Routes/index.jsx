import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import Admin from '../Pages/Admin'
import Login from '../Pages/Login'
import NoFount from '../Pages/404'
import Middleware from '../Middlewares'

const Routes = () => {

    return (
        <Switch>

            <Route path={'/'} exact >
                <Middleware >
                    <Home />
                </Middleware>
            </Route >

            <Route path={'/admin'} >
                <Middleware actions={['is-admin']} >
                    <Admin />
                </Middleware>
            </Route >

            <Route path={'/login'} >
                <Middleware actions={['is-not-auth']} >
                    <Login />
                </Middleware>
            </Route >

            <Route component={NoFount} />
        </Switch>
    )
}

export default Routes