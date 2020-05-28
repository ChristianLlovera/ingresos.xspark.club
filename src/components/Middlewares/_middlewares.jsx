import db from '../DataBase'
import { getAuth } from '../Auth'

export const isAdmin = params => new Promise(resolve => {

    // const { id } = params

    getAuth()
        .then(usr => {
            if (usr && usr.uid && !usr.isAnonymous) { resolve(false) }
            else { resolve('/login') }
        })

})

export const isNotAuth = params => new Promise(resolve => {

    // const { id } = params

    getAuth()
        .then(usr => {
            if (!usr || !usr.uid || usr.isAnonymous) { resolve(false) }
            else { resolve('/admin') }
        })

})



export const middlewareProvider = {
    'is-admin': params => isAdmin(params),
    'is-not-auth': params => isNotAuth(params)
}
