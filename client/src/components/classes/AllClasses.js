import React, { useEffect, useState } from 'react'
import CardList from '../cards/CardList'
import AddingCard from '../cards/AddingCard'
import AddingMoreCard from '../cards/AddingMoreCard';
import { fetchAllClasses } from '../../AppStore/actions/ResultActions';
import LoadScreen from '../common/LoadScreen';
import { Label } from 'reactstrap';



function AllClasses(props) {
    /**
     * 1.   useEffect = fetch all class category and keep in useState = Classes 
     * 2.   if Classes.length === 0 ? display addClasses component
     * 3.   if Classes.length !== 0 ? display ClassesList components
     * 4.   if any card in ClassesList component is clicked? window.location = '/allClass' with props of ClassesId
     *  */

    const [Classes, setClasses] = useState([])

    let sectionName = props.match.params.sectionname
    const [Loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const uid = props.user.uid

    //* 1.   useEffect = fetch all class category
    useEffect(() => {
        //fetch All classes
        fetchAllClasses(sectionName, setClasses, uid, setLoading, setError)
    }, [uid, sectionName])
    return (
        <div>

            <div className='container d-flex justify-content-center align-items-center flex-column '>

                <h4 className='justify-self-center text-center text-danger mt-4 font-weight-bold' >{sectionName.toLocaleUpperCase()} SECTION</h4>
                {
                    Loading ?
                        <LoadScreen />
                        :
                        error ?
                            <Label className='text-danger font-weight-bold m-2 font-italic text-center '>
                                {error}
                            </Label>
                            :
                            Classes.length === 0 ?
                                <div>
                                    <h4 className='text-success text-center mb-3 font-weight-bold'>
                                        <em>
                                            SORRY YOU HAVE NO CLASSES AVAILABLE IN THIS SECTION. <br />PLEASE CLICK THE BUTTON BELOW TO ADD CLASS TO THIS SECTION
                                        </em>
                                    </h4>
                                    <AddingCard sectionName={sectionName} addtype='class' />
                                </div>
                                :
                                // Classes.length === 0 ?
                                //     <Loading />
                                //     :
                                Classes.length !== 0 &&
                                <div className='d-flex flex-row flex-wrap'>
                                    <CardList Classes={Classes} />
                                    <AddingMoreCard sectionName={sectionName} addtype='class' />
                                </div>

                }
            </div>
        </div>
    )
}

export default AllClasses
