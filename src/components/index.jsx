import React from 'react'
import Layout from './Layout'
import Routes from './routes'
import { StoreProvider } from './Store'

const App = () => {
    return (
        <StoreProvider>
            <Layout>
                <Routes />
            </Layout>
        </StoreProvider>
    )
}

export default App

