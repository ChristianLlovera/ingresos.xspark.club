import firebase from '../Config/Firebase'


export const Recaptcha = async elementId => {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(elementId)
    const widgetId = await recaptchaVerifier.render()
    window.recaptchaWidgetId = widgetId
}


export const RecaptchaResponse = async () => {
    const recaptcha = await grecaptcha.getResponse(window.recaptchaWidgetId)
    return recaptcha
}


export const anonymousAuth = () => new Promise(resolve => {

    firebase
        .auth()
        .signInAnonymously()
        .then(res => {
            resolve(res.user)
        })
        .catch(err => console.log(`${err.code} - ${err.message}`))

})


export const getAuth = () => new Promise(resolve => {
    firebase
        .auth()
        .onAuthStateChanged(user => {
            resolve(user)
        })
})


export const singOut = () => new Promise(resolve => {
    firebase
        .auth()
        .signOut()
        .then(res => resolve(res))
        .catch(err => console.log(`${err.code} - ${err.message}`))
})


export const singIn = arr => new Promise((resolve, reject) => {

    const [email, pass] = arr

    firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then(res => resolve(res.user))
        .catch(err => reject(err))

})