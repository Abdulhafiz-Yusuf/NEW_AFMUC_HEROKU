import firebase, { db } from '../../firebase/FirebaseConfig'

//Firestore Refs
const ResultDataRef = db.collection('result');
// const costRef = db.collection("cost").doc("cost");



//RESULT ACTIONS
export const fectchAllOrderData = (dispatch) => {

    let tempDataHolder = [];

    orderDataRef.get()
        .then((querySnapshot) => {
            if (querySnapshot.docs.length !== 0) {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    tempDataHolder = tempDataHolder.concat(doc.data())
                    dispatch({
                        type: 'FETCH_ORDER_DATA',
                        payload: tempDataHolder
                    })
                })
            }
            else if (querySnapshot.docs.length === 0) {
                alert('You have zero order!.')
                dispatch({
                    type: 'FETCH_ORDER_DATA',
                    payload: []
                })
            }
            else {
                alert('Error occur, ensure you Turn ON your internet connection.')
                dispatch({
                    type: 'FETCH_ORDER_DATA',
                    payload: []
                })
            }
        })
        .catch(err =>
            console.log(err)
        )
}

export const fectchCurrentUserOrderData = (dispatch, user, navigation) => {
    let tempDataHolder = [];
    orderDataRef.where('user', '==', user.id)
        .get().then((querySnapshot) => {
            if (querySnapshot.docs.length !== 0) {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    tempDataHolder = tempDataHolder.concat(doc.data())
                    dispatch({
                        type: 'FETCH_ORDER_DATA',
                        payload: tempDataHolder
                    })
                })
            }
            else {
                alert('You have zero order! Please make an order.')
                dispatch({
                    type: 'FETCH_ORDER_DATA',
                    payload: tempDataHolder
                })
                navigation.navigate('Ordering')
            }
        }).catch(err =>
            console.log(err)
        )
}

export const fetchQueryData = (dispatch, query, setLoading) => {
    let tempDataHolder = [];
    console.log(query);
    setLoading(true)
    query.get()
        .then((querySnapshot) => {
            if (querySnapshot.docs.length !== 0) {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    tempDataHolder = tempDataHolder.concat(doc.data())
                    dispatch({
                        type: 'FETCH_ORDER_DATA',
                        payload: tempDataHolder
                    })
                    setLoading(false)
                });
            }
            else {
                setLoading(false)
                alert('No match!')
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

}



export const fetchAPIforOrderScreen = (dispatch, user, setCost, setTotalInCart) => {
    const costRef = db.collection("cost").doc("cost");
    let tempDataHolder = [];
    //fetch cost/kg
    costRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            setCost(doc.data().cost)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        alert('Please check your internet connection')
        onGotoHome()
        console.log("Error getting document:", error);
    });

    //fetch all orderdata for we need total number of cart for current user
    orderDataRef.where("user", "==", user.id).get()
        .then((querySnapshot) => {
            if (querySnapshot.docs.length !== 0) {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    tempDataHolder = tempDataHolder.concat(doc.data())
                    setTotalInCart(tempDataHolder.length)
                })
            }
            else {
                console.log('No Data')
                setTotalInCart(0)
            }
        }).catch(err =>
            console.log(err)
        )
}

export const addToCart = (dispatch, data, setLoading, setError, props) => {

    console.log(data)
    orderDataRef.add(data)
        .then(() => {
            alert('Successful! Thanks')
            setLoading(false)
            props.navigation.navigate('Cart')

        })
        .catch((err) => {
            setError(err.message)
            setLoading(false)
            console.log(err)
        })

}