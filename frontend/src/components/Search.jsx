import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
const Search = () => {
    let navigate = useNavigate()

    const [keyword, setkeyword] = useState('')
    const Handlesearch = (e) => {
        console.log('clickes')
        if (keyword.trim() && e.which == 13) {
            navigate(`/search/${keyword}`)
            // dispatch(listAllProjects(keyword))
        } else {
            navigate(`/profile`)
        }
    }
    const Reset = () => {
        setkeyword('')
        navigate(`/profile`)
    }
    return (
        <>
            <div className="flex mt-3 items-center justify-center ">
                <div className="flex border border-purple-200 rounded">
                    <input
                        type="text"
                        id="searchQueryInput"
                        className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Search..."
                        name="searchQueryInput"
                        value={keyword}
                        onChange={(e) => setkeyword(e.target.value)}
                        onKeyPress={Handlesearch}
                    />
                    <button
                        className="px-4 text-white bg-purple-600 border-l rounded "
                        onClick={Reset}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </>
    )
}

export default Search
