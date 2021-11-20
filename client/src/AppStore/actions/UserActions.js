import Firebase, { db } from '../../services/firebase/FirebaseConfig'

//Firestore Refs
const usersRef = db.collection('user')

export function login(dispatch, email, password, setError, setLoading, history) {
    setError('')
    Firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            usersRef.doc(uid).get()
                .then(firestoreDocument => {
                    if (!firestoreDocument.exists) {
                        setError("User does not exist.")
                        setLoading(false)
                        return;
                    }
                    const user = firestoreDocument.data()
                    dispatch({
                        type: 'GET_CURRENT_USER',
                        payload: user
                    })
                    setLoading(false)
                    window.location = '/allclassSection'
                    // history.push({
                    //     pathname: '/allclassSection',
                    //     state: user
                    // });
                })
                .catch(error => {
                    setError('Login Failed. Please try again.')
                    setLoading(false)
                    console.log(error)
                });
        })
        .catch(error => {
            setError(error.message)
            setLoading(false)
            console.log(error)
        })
}

export const onLogOut = (dispatch, history, setisLoading) => {
    // setisLoading(true)
    Firebase.auth().signOut().then(() => {
        dispatch({
            type: 'GET_CURRENT_USER',
            payload: null
        })
        window.location = '/'
        // setisLoading(false)
    }).catch((error) => {


    });

}

export const singUp = (history, dispatch, username, email, password, section, setError, setLoading) => {
    setError('')
    Firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
                username,
                section,
            };
            usersRef.doc(uid).set(data)
                .then(() => {
                    dispatch({
                        type: 'GET_CURRENT_USER',
                        payload: data
                    })
                    // window.location = '/allclassSection'
                    history.push({
                        pathname: '/allclassSection',
                        state: data
                    });
                })
                .catch((error) => {
                    setError('Registering Failed. Please try again.')
                    setLoading(false)
                    console.log(error)
                });
        })
        .catch((error) => {
            // setError('Login Failed. Please turn ON your internet connection.')
            setLoading(false)
            setError(error.message)
            console.log(error)
        });
}

export function fetchCurrentUser(dispatch, setuser) {
    Firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user)
            setuser(user)
            dispatch({
                type: 'GET_CURRENT_USER',
                payload: user
            })

        } else {
            console.log('no user logged in')
        }
    });
}

export function viewPageAction(page, inmate) {
    return (
        {
            type: 'VIEWPAGE',
            payload: { page, inmate }
        }
    )
}


