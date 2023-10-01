import React, { useEffect, useState } from "react"
import axios from "axios"
import { useGetUserID } from "../hooks/useGetUserID"
import { useCookies } from "react-cookie"
import { useNavigate, Link, useLocation  } from "react-router-dom"
import ReactPaginate from 'react-paginate';

export const Clothing = () => {
    const userID = useGetUserID();
    const [clothing, setClothing] = useState([])
    const [savedClothes, setSavedClothes] = useState([])
    const [cookies, _] = useCookies(["access_token"])
    const serverURL = import.meta.env.VITE_API_BASE_URL;
    const [pageNumber, setPageNumber] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");

    const clothingPerPage = 6;
    const pagesVisited = pageNumber * clothingPerPage
  
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClothing = async () => {
            try {
                const response = await axios.get(`${serverURL}/clothing`);
                setClothing(response.data)
            
            } catch (err) {
                console.error(err);
            }
        }

        const fetchSavedClothing = async() => {
            try {
                const response = await axios.get(`${serverURL}/clothing/savedClothes/ids/${userID}`);
                setSavedClothes(response.data.savedClothes)
            } catch (err) {
                console.error(err);
            }
        }

        if(cookies.access_token) {
            fetchSavedClothing();
        }

        fetchClothing()
    }, []);


    const saveClothe = async(clothesID) => {
        try {
            if(!cookies.access_token) {
                navigate("/auth/login")
            }
            
            const response = await axios.put(`${serverURL}/clothing`, {
                clothesID, 
                userID
            }, {headers: {authorization: cookies.access_token}});

            setSavedClothes(response.data.savedClothes)
           
        } catch (err) {
            console.error(err);
        }
    }
   
    const isClothingSaved = (id) => savedClothes.includes(id);

    const onChangeCategorySearch = (e) => {
        setSelectedCategory(e.target.value);
        console.log(e.target.value);
    }

    const filteredClothing = selectedCategory
            ? clothing.filter(clothes => clothes.category === selectedCategory)
            : clothing;

    const displayClothing = filteredClothing.slice(pagesVisited, pagesVisited + clothingPerPage).map(clothes => (
        <div key={clothes._id} className="card m-5 m:w-1/3">

        <div key={clothes._id} className="border bg-gray-200 p-4 rounded-2xl h-full">

            <div className="grow-0 shrink flex flex-col md:flex-row items-center justify-between">
                <h2 className="text-xl font-bold text-center">{clothes.title}</h2>
                <div className="md:flex items-center m-2 ">
                    <button 
                        className={`block hover-opacity border rounded-full text-xs py-2 px-4 my-2 ml-4 md:ml-0 text-white ${
                                    isClothingSaved(clothes._id) ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                        onClick={() => saveClothe(clothes._id)}
                        disabled = {isClothingSaved(clothes._id)}
                    >
                        {isClothingSaved(clothes._id) ? "Saved!" : "Save"}
                    </button>
                    <Link to={
                            cookies.access_token ? `/clothing/${clothes._id}` : `/auth/login`
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
            {/* <div className="text-sm flex"><p className="font-bold">Average Rating: </p> {average(clothes.reviews)}</div> */}
    
            <div className="flex bg-gray-100 p-4 rounded-2xl m-4 justify-center">
                <div className="grid md:grid-cols-3 lg:grid-cols-3">

                    {
                        clothes.images.length > 0 ? clothes.images.map((images) => (
                            <img src={images} alt="Image(s) of item" className="m-1" style={{ width: '100px', height: '100px' }} key={images}/> 
                        ))
                        :
                        <h2 className="text-xs md:text-base">No Image(s) Uploaded</h2>
                        
                    }
                </div>
            </div>
        </div>
        </div>
    
    ))

    const pageCount = Math.ceil(clothing.length / clothingPerPage)
    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    return (
        <div className="w-9/12 mx-auto flex-grow">
            <div className="lg:flex items-center">
                <div id="title-line">
                    {/* <h1 className="font-bold underline text-center mb-5">Clothing for Rent</h1> */}
                    <input placeholder="*search function tbd" className="border p-2 rounded-full"></input>
                    
                </div>
                <h2 className="m-2 lg:ml-5">Search by Category: </h2>
                <div>
                   
                    <select onChange={onChangeCategorySearch} className="border p-2 rounded-full">
                        {[...new Set(clothing.map(clothes => clothes.category))].map(category => (
                            <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1).substr(0, 19)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            
            <ul className="grid md:grid-cols-3">
                {displayClothing}
            </ul>
            <ReactPaginate 
                     previousLabel={"Previous"}
                     nextLabel={"Next"}
                     pageCount={pageCount}
                     onPageChange={changePage}
                     containerClassName={"paginationBttns"}
                     previousLinkClassName={"previousBttn"}
                     nextLinkClassName={"nextBttn"}
                     disabledClassName={"paginationDisabled"}
                     activeClassName={"paginationActive"}
                />
        </div>  
    )
}