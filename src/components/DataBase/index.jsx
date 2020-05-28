import firebase from '../Config/Firebase'

const connect = firebase.firestore()
const db = { petitions: {}, format: {} }

db.format.date = data => {
    return firebase.firestore.Timestamp.fromDate(data)
}

db.petitions.orderBy = obj => {
    db.petitions.sort = obj
    return db.petitions
}

db.petitions.limit = obj => {
    db.petitions.lazy = obj
    return db.petitions
}

db.petitions.list = async () => {


    const payload = arr => {
        const result = []

        arr.forEach(doc => {
            const data = doc.data()
            const obj = { id: doc.id, ...data }
            result.push(obj)
        })

        return result
    }


    let refCollection = connect.collection("petitions")


    if (db.petitions.sort) {
        const sort = db.petitions.sort
        refCollection = refCollection
            .orderBy(sort.field, sort.type)
    }

    if (db.petitions.lazy) {
        const lazy = db.petitions.lazy
        if (lazy.last) {
            refCollection = refCollection
                .startAfter(lazy.last)
        }
        if (lazy.limit) {
            refCollection = refCollection
                .limit(lazy.limit)
        }
    }

    const response = await refCollection.get()

    const lastVisible = response.docs[response.docs.length - 1]

    return {
        last: lastVisible,
        payload: payload(response),
        snapshot: func => {
            const unregister = refCollection.onSnapshot(res =>
                func(payload(res), unregister)
            )
        }
    }

}


db.petitions.get = async id => {

    const payload = doc => {

        let result = { exists: false, id: id }

        if (doc.exists) {
            const data = doc.data()
            result = { exists: true, id: id, ...data }
        }

        return result
    }

    const refCollection = connect.doc(`petitions/${id}`)
    const response = await refCollection.get()


    return {
        payload: payload(response),
        snapshot: func => {

            const unregister = refProfile.onSnapshot(doc =>
                func(payload(doc), unregister)
            )
        }
    }

}

db.petitions.update = async (id, data) => {
    const refCollection = connect.doc(`petitions/${id}`)
    await refCollection.update(data)
    return true
}

db.petitions.create = async data => {
    const refCollection = connect.collection(`petitions`)
    const response = await refCollection.add(data)
    const payload = { exists: true, id: response.id, ...data }
    return payload
}

db.petitions.delete = async id => {
    const refColl = connect.doc(`petitions/${id}`)
    await refColl.delete()
    return true
}


export default db