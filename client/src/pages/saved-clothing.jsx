import { useEffect, useState } from "react"
import axios from "axios"
import { useGetUserID } from "../hooks/useGetUserID"
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query"
import DotLoader from "react-spinners/ClipLoader";

export const SavedClothingList = () => {
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"])
    const [savedClothing, setSavedClothing] = useState([])
    const navigate = useNavigate();
    const serverURL = import.meta.env.VITE_API_BASE_URL;

    const {data:savedClothingData, isLoading, isError, refetch} = useQuery(["savedClothes"], () => {
        return axios.get(`${serverURL}/clothing/savedClothes/${userID}`).then((res) => {
            setSavedClothing(res.data.savedClothes)
            return res.data.savedClothes
        });
    });

    if (isError) {
        return <h1 className="font-bold text-xl">Error: Couldn't retrieve clothes list ):</h1>
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                <DotLoader color="#36d7b7" />
                    <h1>Loading Saved List...</h1>
                </div>
          </div>
        )
    }


    // useEffect(() => {
    //     refetch();
    //     // const fetchSavedClothing = async() => {
    //     //     try {
    //     //         const response = await axios.get(`${serverURL}/clothing/savedClothes/${userID}`, );
    //     //         setSavedClothing(response.data.savedClothes)
    //     //     } catch (err) {
    //     //         console.error(err);
    //     //     }
    //     // }

    //     // fetchSavedClothing();
    // }, [refetch])

    if(!cookies.access_token) {
        navigate('/auth/login')
    }

    const removeFromSaved = async (clothesID) => {
        try {
            await axios.delete(`${serverURL}/clothing/savedClothes/${userID}/${clothesID}`)
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
                {savedClothing && savedClothing.map((clothes) => (
                    <li key ={clothes._id} className="card m-5 m:w-1/3">
                        <div className="border bg-gray-200 p-4 rounded-2xl h-full">
                            <div className="grow-0 shrink flex flex-col md:flex-row items-center justify-between">
                                <Link className="text-xl font-bold" to={`/clothing/${clothes._id}`}>{clothes.title}</Link>

                                <button 
                                    className="hover-opacity border rounded-full text-xs py-2 px-4 m-2 bg-red-600 text-white" 
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
                        <div className="flex bg-gray-100 p-4 rounded-2xl m-4 justify-center">
                            <div className="grid md:grid-cols-3 lg:grid-cols-3">
  
                                {
                                    clothes.images.length > 0 ? 
                                    clothes.images.map((images) => (
                                        <img src={images} alt="Image(s) of item" className="m-1" style={{ maxWidth: '100px', maxHeight: '100px' }} key={images}/> 
                                    )) :
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