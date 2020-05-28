import React, { useState, useEffect } from 'react'
import { Card, CardTitleHeader, CardRowList } from '../../Layout/Card'
import IconButton from '../../Layout/IconButton'
import { handlerLogout } from '../../Handlers/handlersLogin'
import { useHistory } from 'react-router-dom'
import { handlerList, handlerLazyList, handlerDelete, handlerDownload } from '../../Handlers/handlersAdmin'
import visibility from '../../Utils/visibility'

if (process.env.WEBPACK) { require('./_style.scss') }


const Admin = props => {

    const history = useHistory()
    const [downloading, setDownloading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadRows, setLoadRows] = useState(false)
    const [data, setData] = useState([])
    const [lazy, setLazy] = useState({ limit: 20, last: '' })
    const [sort, setSort] = useState({ field: 'createAt', type: 'desc' })
    const dep = { history, data, setData, sort, lazy, setLazy, loadRows, setLoadRows, setLoading }


    useEffect(() => {
        handlerList(dep)
        const trigger = document.querySelector('.lazy')
        visibility({ visible: () => trigger.click(), hidden: () => { } }, '.lazy')
    }, [])


    useEffect(() => {
        setData([])
        setLoadRows(true)
        handlerList(dep)
    }, [sort])


    return (
        <Card loader={loading} >
            <CardTitleHeader
                title="Solicitudes"
                type="list"
                buttonLeft={
                    <IconButton
                        process={downloading}
                        radio={50}
                        icon="download"
                        onClick={() => handlerDownload({ ...dep, setDownloading })} />}
                buttonRight={
                    <IconButton
                        radio={50}
                        icon="exit"
                        onClick={() => handlerLogout(dep)} />}
            />
            <a href="" id="download" download="solicitudes.csv"></a>
            <CardRowList list={data} handlerDel={handlerDelete} setSort={setSort} loading={loadRows} />
            <div className='lazy' onClick={() => handlerLazyList(dep)}></div>
        </Card>
    )
}

export default Admin