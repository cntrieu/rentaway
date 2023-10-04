import React, { useEffect, useState } from "react"
import axios from "axios"
import { useGetUserID } from "../hooks/useGetUserID"
import { useCookies } from "react-cookie"
import { useNavigate, Link, useLocation  } from "react-router-dom"
import ReactPaginate from 'react-paginate';
import { useQuery } from "react-query"
import ClipLoader from "react-spinners/ClipLoader";
import { DisplayClothing } from "../components/displayClothing"

export const Clothing = () => {
    const userID = useGetUserID();
    const [savedClothes, setSavedClothes] = useState([])
    const [cookies, _] = useCookies(["access_token"])
    const [pageNumber, setPageNumber] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [query, setQuery] = useState("");
    const [searchData, setSearchData] = useState([]);
    const clothingPerPage = 6;
    const navigate = useNavigate();
    const serverURL = import.meta.env.VITE_API_BASE_URL;


    const {data:clothingData, isLoading, isError} = useQuery(["clothes"], () => {
        return axios.get(`${serverURL}/clothing`).then((res) => res.data);
    });

    const {data:savedClothingData} = useQuery(["savedClothes"], () => {
        return axios.get(`${serverURL}/clothing/savedClothes/ids/${userID}`).then((res) => {
            setSavedClothes(res.data.savedClothes)
            res.data
        });
    });

    useEffect(() => {
        const fetchData = async() => {
            const res = await axios.get(`${serverURL}/clothing/?q=${query}`)
            setSearchData(res.data);
        };
        if (query.length === 0 || query.length > 2) fetchData(); 
    }, [query])


    if (isError) {
        return <h1 className="font-bold text-xl">Error: Couldn't retrieve clothes list ):</h1>
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <ClipLoader
                        color={"#36d7b7"}
                        loading={isLoading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    <h1>Loading Clothing List...</h1>
                </div>
          </div>
        )
    }

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

    const onChangeCategorySearch = (e) => {
        const selectedValue = e.target.value
        if (selectedValue === "") {
            
            setSelectedCategory(null); // Reset selected category to null or an initial value
        } else {
            setSelectedCategory(selectedValue); // Set the selected category
        }
    }

    const onChangeTypedSearch = (e) => {
        console.log(e.target.value)
        setQuery(e.target.value.toLowerCase())
    }

    const categories = [...new Set(clothingData.map(clothes => clothes.category))];
    const filteredCategories = categories.filter(category => category !== "");

    const filteredClothing = selectedCategory
            ? clothingData.filter(clothes => clothes.category === selectedCategory)
            : clothingData;

    const pageCount = Math.ceil(clothingData.length / clothingPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    return (
        <div className="w-5/6 mx-auto flex-grow mb-3">
            <div className="lg:flex items-center">
                <div id="title-line">
                    {/* <h1 className="font-bold underline text-center mb-5">Clothing for Rent</h1> */}
                    <input placeholder="Search" className="border p-2 rounded-full" onChange={onChangeTypedSearch}></input>
                    
                </div>
                <h2 className="m-2 lg:ml-5">Filter by Category: </h2>
                <div>
                   
                <select onChange={onChangeCategorySearch} className="border p-2 rounded-full" >
                    <option value="">Select Category</option>
                    {filteredCategories.map(category => (
                        <option key={category} value={category}>
                            {category === "" ? "Select Category" : category.charAt(0).toUpperCase() + category.slice(1).substr(0, 19)}
                        </option>
                    ))}
                </select>
                
                </div>
            </div>
            
            <ul className="grid md:grid-cols-2 lg:grid-cols-3">
                <DisplayClothing 
                    filteredClothing={filteredClothing} 
                    pageNumber={pageNumber} 
                    savedClothes={savedClothes}
                    saveClothe={saveClothe}
                    searchData={searchData}/>
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