import React, { useEffect, useState } from 'react'

import AddingMoreCard from '../cards/AddingMoreCard';

import CardList from '../cards/CardList'
import AddingCard from '../cards/AddingCard'

import { dbServices } from '../../services/services';

function AllClassSection() {
    /**
     * 1.   useEffect = fetch all class category and keep in useState = ClassSection 
     * 2.   if ClassSection.length === 0 ? display addClassSection component
     * 3.   if ClassSection.length !== 0 ? display ClassSectionList components
     * 4.   if any card in ClassSectionList component is clicked? window.location = '/allClass' with props of ClassSectionId
     *  */

    const [ClassSection, setClassSection] = useState([])

    useEffect(() => {
        //* 1.   useEffect = fetch all class category
        dbServices.fetchAllSections(setClassSection, ClassSection)

    }, [])
    return (
        <div>


            <div className='d-flex justify-content-center'>
                {
                    ClassSection.length === 0 ?
                        <div>
                            <h4 className='text-success text-center mb-3 font-weight-bold'>
                                <em>
                                    SORRY YOU HAVE NO SECTION AVAILABLE. <br />PLEASE CLICK THE BUTTON BELOW TO ADD SECTION
                                </em>
                            </h4>
                            <AddingCard addtype='section' />
                        </div>
                        :
                        // ClassSection.length === 0 ?
                        //     <Loading /> :
                        ClassSection.length !== 0 &&
                        <div className='d-flex flex-column flex-wrap'>
                            <h4 className='justify-self-center text-center text-danger mt-4 font-weight-bold' >AVAILABLE SECTIONS</h4>

                            <div className='d-flex flex-row flex-wrap'>
                                <CardList ClassSection={ClassSection} />
                                <AddingMoreCard addtype='section' />
                            </div>
                        </div>

                }
            </div>
        </div>
    )
}

export default AllClassSection
