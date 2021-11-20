import
// firebase,
{ db }
    from '../../services/firebase/FirebaseConfig'

//Firestore Refs
const ResultDataRef = db.collection('result');
const SectiontDataRef = db.collection('section');
const orderDataRef = db.collection("order");



//RESULT ACTIONS
export const saveAllSection = (history, ClassSection, user) => {
    console.log(ClassSection)
    SectiontDataRef.doc(user.uid)
        .set(
            {
                category: ClassSection,
                no_of_classes: 0
            }
        )
        .then(() => {
            history.push({
                pathname: '/allclassSection',
                // state: {}
            });
            alert('Section(s) added successful!')

        }).catch(function (err) {
            if (err)
                console.log('not updated')
        });
}



export const addToSection = (dispatch, data, setLoading, setError, props) => {
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

export const fetchAllSections = (setClassSection, uid) => {
    console.log(uid)
    SectiontDataRef
        .doc(uid)
        .get()
        .then((result) => {
            if (result)
                setClassSection(result.data().category)
            // else alert('You have no')
        })
        .catch(err =>
            console.log(err)
        )
}


export const fetchAllClasses = (sectionName, setClasses, uid) => {
    // const sectionName = sectionName
    SectiontDataRef
        .doc(uid)
        .get()
        .then((result) => {
            if (result) {
                setClasses(result.data().sectionName)
                // else alert('You have no')
            }
        })
        .catch(err =>
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