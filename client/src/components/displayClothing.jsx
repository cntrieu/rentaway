import React from "react";
import { useCookies } from "react-cookie"
import { useGetUserID } from "../hooks/useGetUserID"
import { useNavigate, Link, useLocation  } from "react-router-dom"
import { useQuery } from "react-query"

export const DisplayClothing = ({filteredClothing, pageNumber, savedClothes, saveClothe, searchData, query}) => {
    const [cookies, _] = useCookies(["access_token"])
    const clothingPerPage = 6;
    const pagesVisited = pageNumber * clothingPerPage
    const userID = useGetUserID();  

    return (
        // if query is true, user is typing something in search
       (query ? searchData : filteredClothing).slice(pagesVisited, pagesVisited + clothingPerPage).map(clothes => 
            (
            <div key={clothes._id} className="card m-5 m:w-1/3">
           
            <div key={clothes._id} className="border bg-gray-200 p-4 rounded-2xl h-full">
    
                <div className="grow-0 shrink flex flex-col items-center justify-between">
                    <h2 className="text-xl font-bold text-center">{clothes.title}</h2>
                    <div className="md:flex items-center m-2 ">
    
                        {/* If savedClothes includes current clothes id */}
                        { cookies.access_token &&
                            (clothes.userOwner === userID) ? 
                                null
                            :
                            <button 
                            className={`block hover-opacity border rounded-full text-xs py-2 px-4 my-2 ml-4 md:ml-0 text-white ${
                                        savedClothes?.includes(clothes._id) ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                                        }`}
                            onClick={() => saveClothe(clothes._id)}
                            disabled = {savedClothes?.includes(clothes._id)}
                        >
                            {savedClothes?.includes(clothes._id) ? "Saved!" : "Save"}
                        </button>
                        }   
                        <Link to={
                            `/clothing/${clothes._id}`
                            } className="hover-opacity border bg-amber-900 rounded-full text-xs py-2 px-4 text-white">
                                View Listing
                        </Link>
                    </div>
                </div>
    
                <div className="description p-3 text-sm" >
                    {
                        clothes.description.length > 125 ? (
                        <>
                        {`${clothes.description.slice(0, 125)}...`} <Link to={`/clothing/${clothes._id}`} className="text-blue-500 hover-opacity">Read More</Link>
                    </>) :
                        clothes.description
                    }
                </div>
    
                <div className="text-sm flex"><p className="font-bold">Price: </p> ${clothes.price}</div>
                <div className="text-sm flex"><p className="font-bold">Location: </p> {clothes.location}</div>
        
                <div className="flex bg-gray-100 p-4 rounded-2xl m-4 justify-center">
                    <div className="grid lg:grid-cols-3">
    
                        {
                            clothes.images.length > 0 ? clothes.images.map((images) => (
                                <img src={images} alt="Image(s) of item" className="m-1" style={{ minWidth: '100px', minHeight: '100px' }} key={images}/> 
                            ))
                            :
                            <h2 className="text-xs md:text-base">No Image(s) Uploaded</h2>
                            
                        }
                    </div>
                </div>
            </div>
            </div>
        
        ))
    );
}