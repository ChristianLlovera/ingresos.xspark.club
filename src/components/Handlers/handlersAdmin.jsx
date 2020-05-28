import db from '../DataBase'
import moment from 'moment'
import jsonexport from 'jsonexport'

export const handlerList = obj => {

    const { setData, setLoadRows, sort, setLazy } = obj

    db.petitions
        .orderBy(sort)
        .limit({ limit: 20, last: '' })
        .list()
        .then(res => {
            setLoadRows(false)
            setLazy({ limit: 20, last: res.last })
            setData(res.payload)
        })
}

export const handlerLazyList = obj => {
    const { data, setData, sort, lazy, setLazy, loadRows, setLoadRows } = obj

    if (!loadRows) {
        setLoadRows(true)

        db.petitions
            .orderBy(sort)
            .limit(lazy)
            .list()
            .then(res => {
                setLoadRows(false)
                if (res.last) {
                    setLazy({ limit: 20, last: res.last })
                    setData([...data, ...res.payload])
                }
            })
    }

}

export const handlerDelete = obj => {

    const { id } = obj

    const element = document.querySelector(`[data-id="${id}"]`)

    db.petitions
        .delete(id)
        .then(res => {
            element.remove()
        })

}

export const handlerDownload = obj => {

    const { sort, setDownloading } = obj
    const dowloadLink = document.querySelector('#download')

    const formatData = data => {
        data.map(elem => {
            delete elem.id
            delete elem.recaptcha
            delete elem.uid

            if (elem.createAt) {
                elem.createDate = moment(elem.createAt.toDate()).format("DD/MM/YYYY")
                delete elem.createAt
            }

        })

        return data
    }

    const exportData = data => jsonexport(data, (err, csv) => {
        if (err) return console.log(err)
        let csvContent = "data:text/csv;charset=utf-8," + csv
        let encodedUri = encodeURI(csvContent)
        dowloadLink.setAttribute("href", encodedUri)
        dowloadLink.click()
    })

    setDownloading(true)

    db.petitions
        .orderBy(sort)
        .limit({ limit: '', last: '' })
        .list()
        .then(res => {
            setDownloading(false)
            const data = formatData(res.payload)
            exportData(data)
        })

}
