import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from "../hooks/useGetUserID"
import { useCookies } from "react-cookie"
import { Reviews } from '../components/reviews';

export const ViewClothingItem = () => {
    const {clothesId} = useParams();
    const userID = useGetUserID();
    const [clothingItem, setClothingItem] = useState([])
    const [clothingOwner, setClothingOwner] = useState(null);
    const [savedClothes, setSavedClothes] = useState([])
    const [cookies, _] = useCookies(["access_token"])
    const navigate = useNavigate()
    const [showUnfinished, setShowUnfinished] = useState(false)

    const handleButtonClick = () => {
        setShowUnfinished(true);

        setTimeout(() => {
            setShowUnfinished(false);
          }, 4000);
      };

    if(!cookies.access_token) {
        navigate('/auth/login')
    }

    useEffect(() => {
        const fetchViewClothing = async() => {
            try {
                const response = await axios.get(`http://localhost:3001/clothing/${clothesId}`);
                setClothingItem(response.data.getClothing)

                // Set inside this code so it loads AFTER instead of before
                fetchClothingOwner(response.data.getClothing.userOwner);
            } catch (err) {
                console.error(err);
            }
        }

        const fetchSavedClothingUserID = async(userID) => {
            try {
                const response = await axios.get(`http://localhost:3001/users/${userID}`)
                setSavedClothes(response.data.savedClothes)
            } catch(err) {
                console.error(err)
            }
        }

        const fetchClothingOwner = async(clothingOwnerID) => {
            try {
                const response = await axios.get(`http://localhost:3001/users/${clothingOwnerID}`)
              
                setClothingOwner(response.data);
            } catch(err) {
                console.error(err)
            }
        }

        fetchSavedClothingUserID(userID)
        fetchViewClothing();
        
    }, [])

   
    const saveClothe = async(clothesID) => {
        try {

            if(!cookies.access_token) {
                navigate("/auth/login")
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

    const isClothingSaved = (id) => savedClothes && savedClothes.includes(id);
   
    return (
        <div className="w-9/12 mx-auto flex-grow">
            <div className="border bg-gray-200 p-4 m-4 rounded-2xl">
    
                <div className="grow-0 shrink flex flex-col md:flex-row items-center justify-between pb-4">
                    <h2 className="text-xl">{clothingItem.title}</h2>
                    <div className="md:flex items-center">
                        <button 
                            className={`hover-opacity border rounded-full text-xs py-2 px-4 text-white ${
                                isClothingSaved(clothingItem._id) ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                                }`}
                            onClick={() => saveClothe(clothingItem._id)}
                            disabled = {isClothingSaved(clothingItem._id)}
                            >
                            {isClothingSaved(clothingItem._id) ? "Saved!" : "Save"}
                        </button>
                    </div>
                </div>
                <div className="description">
                    {clothingItem.description}
                </div>
                    <div className="text-sm flex">
                        <p className="font-bold">Price:</p>&nbsp;${clothingItem.price}
                    </div>
                    
                    <div className="text-sm flex">
                        <p className="font-bold">Location:</p>&nbsp;{clothingItem.location}
                    </div>

                        <div className="text-sm flex">
                            <p className="font-bold">Posted By: </p>&nbsp;{clothingOwner ? clothingOwner.username : 'Loading...'}
                        </div>
                        <div>

                    <div>
                        <button className="text-sm flex hover-opacity border bg-green-500 rounded-full py-1 px-4 text-green mt-3" onClick={handleButtonClick}>
                            <p className="font-bold"> Message</p>
                        </button>
                        {
                            showUnfinished && 
                            <div class="w-1/4 p-4 my-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                <span class="font-medium">This feature is in progress ☺</span>
                            </div>
                        }
                        </div>

                    </div>

                <div className="flex bg-gray-100 p-4 rounded-2xl m-4">
                    <div className="h-full">
                    {clothingItem.images && clothingItem.images.length > 0 ? (
                            clothingItem.images.map((image, index) => (
                                <img src={image} alt="" className="w-1/3 md:w-full rounded-xl mb-2" key={index} />
                            ))
                        ) : (
                            <h2>No Image(s) Uploaded</h2>
                        )}

                    </div>
                </div>
            </div>

            <Reviews clothesId={clothesId}/>
        </div>
    )
}