import { useEffect, useState } from "react"
import axios from "axios"
import { useGetUserID } from "../hooks/useGetUserID"
import { Link } from "react-router-dom"

export const SavedClothingList = () => {
    const userID = useGetUserID();

    const [savedClothing, setSavedClothing] = useState([])

    useEffect(() => {
        const fetchSavedClothing = async() => {
            try {
                const response = await axios.get(`http://localhost:3001/clothing/savedClothes/${userID}`, );
                setSavedClothing(response.data.savedClothes)
            } catch (err) {
                console.error(err);
            }
        }

        fetchSavedClothing();
    }, [])

    const removeFromSaved = async (clothesID) => {
        try {
            await axios.delete(`http://localhost:3001/clothing/savedClothes/${userID}/${clothesID}`)
            setSavedClothing((prevSavedClothing) =>
            prevSavedClothing.filter((clothes) => clothes._id !== clothesID)
        );
        } catch (err) {
            console.error(err)
        }
    }
   
    return (
        <div className="w-9/12 mx-auto flex-grow">
            <h1 className="font-bold underline text-center">Saved Clothing</h1>
            <ul className="grid md:grid-cols-3">
                {savedClothing.map((clothes) => (
                    <li key ={clothes._id} className="card m-5 m:w-1/3">
                        <div className="border bg-gray-200 p-4 rounded-2xl h-full">
                            <div className="grow-0 shrink flex flex-col md:flex-row items-center justify-between">
                                <h2 className="text-xl">{clothes.title}</h2>

                                <button 
                                    className="hover-opacity border rounded-full text-xs py-2 px-4 bg-red-600 text-white" 
                                    type="button" 
                                    onClick={() => removeFromSaved(clothes._id)}>Remove</button>
                            </div>

                            <div className="description p-3 text-sm">
                            {
                                clothes.description.length > 150 ? (
                                <>
                                {`${clothes.description.slice(0, 150)}...`} <Link to={`/clothing/${clothes._id}`} className="text-blue-500 hover-opacity">Read More</Link>
                            </>) :
                                clothes.description
                            }
                        </div>

                        <div className="text-sm">Price: ${clothes.price}</div>
                        <div className="text-sm">Location: {clothes.location}</div>
                        <div className="flex bg-gray-100 p-4 rounded-2xl m-4">
                            <div className="h-40 flex">
  
                                {
                                    clothes.images.length > 0 ? 
                                    <img src={`http://127.0.0.1:3001/uploads/${clothes.images[0]}`} alt="" /> :
                                    <h2>No Image(s) Uploaded</h2>
                                }
                            </div>
                        </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}