import { useEffect, useState } from "react"
import axios from "axios"
import { useGetUserID } from "../hooks/useGetUserID"

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
   
    return (
        <div>
            <h1>Saved Clothing</h1>
            <ul>
                {savedClothing.map((clothes) => (
                    <li key ={clothes._id}>
                        <div>
                            <h2>{clothes.brand}</h2>
                        </div>
                        <div className="description">
                            {clothes.description}
                        </div>
                    <img src="" />
                    <p>Price: ${clothes.price}</p>
                    <p>Location: {clothes.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}