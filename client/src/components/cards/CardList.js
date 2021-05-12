import React from 'react'
import Card from './Card'
import Loading from '../reusables/Loading'

const CardList = ({ Classes, ClassSection }) => {

    if (Classes) {
        return (
            !Classes || Classes.length === 0 ?
                <Loading />
                :
                Classes.length !== 0 && Classes.map((Class, index) => {
                    return (
                        <div key={index}>
                            <Card Class={Class} />
                        </div>
                    )
                })
        )
    }

    if (ClassSection) {
        return (
            !ClassSection || ClassSection.length === 0 ?
                <Loading />
                :
                ClassSection !== 0 && ClassSection.map((ClassSection, index) => {
                    return (
                        <div key={index}>
                            <Card ClassSection={ClassSection} />
                        </div>
                    )
                })
        )
    }



}

export default CardList