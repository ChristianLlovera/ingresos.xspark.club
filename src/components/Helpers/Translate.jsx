const words = {//datos de traducción
    name: 'nombre',
    lastname: 'apellido',
    birthdate: 'fecha de nacimiento',
    academy: 'academia',
    ranking: 'puntaje',
    speed: 'velocidad',
    agility: 'agilidad',
    strength: 'fuerza',
    resistance: 'resistencia',
    coordination: 'coordinación',
    driving: 'conducción',
    dodge: 'regate',
    shot: 'tiro',
    pass: 'pase',
    control: 'control',
    observation: 'observaciones',
    company: 'compañia',
    number: 'número',
    document: 'documento',
    mail: 'correo eléctronico',
    phone: 'teléfono',
    emergency: 'teléfono de emergencia',
    coach: 'entrenador',
    director: 'director deportivo'
}

const trans = word => {
    return words[word] ? words[word] : word
}

export default trans