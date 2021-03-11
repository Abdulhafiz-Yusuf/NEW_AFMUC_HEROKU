import React from 'react'
import Card from './Card'


const CardList = ({ bgData }) => {

    return (

        bgData && bgData.map((bgData, index) => {
            return (
                <Card bgData={bgData} />
            )
        }
        )


    )

}

export default CardList