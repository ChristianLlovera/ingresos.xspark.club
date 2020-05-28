import db from '../DataBase'
import Validator from 'validatorjs'
import { RecaptchaResponse, getAuth, anonymousAuth } from '../Auth'


export const handlerAddPetitions = obj => {

    const { getData, setErr, setData, setLoading, setSave } = obj
    const data = getData()

    setData(data)

    const rules = {
        name: 'required|string',
        phone: 'required|numeric',
        email: 'required|email',
        athlete: 'required|string',
        age: 'required|numeric',
        sex: 'required',
        discipline: 'required',
        zone: 'required',
        recaptcha: 'required',
        uid: 'required'
    }

    const customMessage = {
        'required.name': 'El cambo Nombre Completo es Obligatorio',
        'string.name': 'El valor del nombre no puede ser numerico',
        'required.phone': 'El campo Teléfono es obligatorio',
        'numeric.phone': 'El Teléfono debe ser un número',
        'required.email': 'El campo Correo Electrónico es obligatorio',
        'email.email': 'Debes colocar un correo electrónico válido',
        'required.athlete': 'El nombre del Atleta es obligatorio',
        'string.athlete': 'El Nombre del Atleta no puede ser numerico',
        'required.age': 'El Campo Edad del Atleta es obligatorio',
        'numeric.age': 'La Edad del Atleta debe ser un número',
        'required.sex': 'Debes seleccionar el Sexo del Atleta',
        'required.discipline': 'Debes selecionar una Disciplina',
        'required.zone': 'Debes selecionar una Zona',
        'required.recaptcha': 'Debes indicar que no eres un robot',
        'required.uid': 'Error de autenticación, por favor intentalo de nuevo.'
    }

    const handlerShowError = validate => {
        const err = validate.errors.all()
        setErr(err)//set del estado de error
        Object.keys(err).map((element) => {//coloca los campos erroneos en rojo
            const component = document.querySelector(`[name=${element}]`)
            if (component) {
                component.parentNode.dataset.error = true
            }
        })
    }

    const handlerSaveData = () => {
        setLoading(true)
        setSave(true)
        db.petitions.create(data).then(res => {
            setLoading(false)
            setData({})
            setErr('')
        })
    }


    getAuth()
        .then(usr => usr ? usr : anonymousAuth())
        .then(usr => { data.uid = usr.uid })
        .then(res => RecaptchaResponse())
        .then(res => {
            data.recaptcha = res
            data.createAt = db.format.date(new Date())
            const validate = new Validator(data, rules, customMessage)
            if (validate.fails()) { handlerShowError(validate) }
            else { handlerSaveData() }
        })


}

