import React from 'react'
import './Genres.scss'
import {useSelector} from 'react-redux'

function Genres({data}) {

    const {genres} = useSelector(state => state.home)

    return (
        <div className='genres'>
            {data?.map((id) => {
                if(!genres[id]?.name) return
                return (
                    <div className="genre">
                        {genres[id]?.name}
                    </div>
                )
            })}
        </div>
    )
}

export default Genres