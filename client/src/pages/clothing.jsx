import { useEffect, useState } from "react"
import axios from "axios"
import { useGetUserID } from "../hooks/useGetUserID"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export const Clothing = () => {
    const userID = useGetUserID();
    const [clothing, setClothing] = useState([])
    const [savedClothes, setSavedClothes] = useState([])
    const [cookies, _] = useCookies(["access_token"])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClothing = async () => {
            try {
                const response = await axios.get("http://localhost:3001/clothing");
                setClothing(response.data)
            } catch (err) {
                console.error(err);
            }
        }

        const fetchSavedClothing = async() => {
            try {
                const response = await axios.get(`http://localhost:3001/clothing/savedClothes/ids/${userID}`);
                setSavedClothes(response.data.savedClothes)
            } catch (err) {
                console.error(err);
            }
        }

        fetchClothing()

        if(cookies.access_token) {
            fetchSavedClothing();
        }
       
    }, []);

    const saveClothe = async(clothesID) => {
        try {

            if(!cookies.access_token) {
                navigate("/auth")
            }
            const response = await axios.put("http://localhost:3001/clothing", {
                clothesID, 
                userID
            }, {headers: {authorization: cookies.access_token}});

            setSavedClothes(response.data.savedClothes)
           
        } catch (err) {
            console.error(err);
        }
    }
   
    const isClothingSaved = (id) => savedClothes.includes(id);

    return (
        <div>
            <h1 className="text-8xl font-bold underline text-red-500">Clothing</h1>
            <ul>
                {clothing.map((clothes) => (
                    <li key ={clothes._id}>
    
                        <div>
                            <h2>{clothes.brand}</h2>
                            <button 
                            onClick={() => saveClothe(clothes._id)}
                            disabled = {isClothingSaved(clothes._id)}
                            >
                                {isClothingSaved(clothes._id) ? "Already Saved" : "Save"}
                            </button>
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