import React, { useEffect, useState } from 'react'
// import db from '../../db'


import CardList from '../cards/CardList'
import AddingCard from '../cards/AddingCard'
import AddingMoreCard from '../cards/AddingMoreCard';
import SideBar from '../SideBar/SideBar'
import Header from '../Header'
import { dbServices } from '../../services/services'


function AllClasses(props) {
    /**
     * 1.   useEffect = fetch all class category and keep in useState = Classes 
     * 2.   if Classes.length === 0 ? display addClasses component
     * 3.   if Classes.length !== 0 ? display ClassesList components
     * 4.   if any card in ClassesList component is clicked? window.location = '/allClass' with props of ClassesId
     *  */

    const [Classes, setClasses] = useState([])
    let sectionName = props.match.params.sectionname


    //* 1.   useEffect = fetch all class category
    useEffect(() => {
        //fetch All classes
        dbServices.fetchAllClasses(sectionName, setClasses, Classes)
    }, [])
    return (
        <div>

            <div className='container d-flex justify-content-center align-items-center flex-column '>

                <h4 className='justify-self-center text-center text-danger mt-4 font-weight-bold' >{sectionName.toLocaleUpperCase()} SECTION</h4>
                {
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
