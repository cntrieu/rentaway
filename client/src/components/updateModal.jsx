import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from "react-query"
import { useGetUserID } from "../hooks/useGetUserID"
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const UpdateModal = ({ clothesID, clothingItem, closeModal, updateItemData }) => {
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"])
    const [characterCount, setCharacterCount] = useState(0);
    const [updateClothingData, setUpdateClothingData] = useState({
        title: clothingItem.title || "",
        description: clothingItem.description || "",
        category: clothingItem.category || "",
        location: clothingItem.location || "",
        price: clothingItem.price || 0,
        userOwner: userID
      });
    const serverURL = import.meta.env.VITE_API_BASE_URL;

      useEffect(() => {
        setCharacterCount(updateClothingData.description.length)
      }, [])


    const handleChange = (event) => {
        const {name, value} = event.target;
        setUpdateClothingData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
       
    }

    const selectChange = (e) => {
        const selectedValue = e.target.value
        // const updatedClothing = { ...clothingItem, category: selectedValue };
        const updatedClothing = ((prevData) => ({
            ...prevData,
            category: selectedValue
        }))
        setUpdateClothingData(updatedClothing)
    }
   
   
    const countCharacters = (e) => {
        const target = e.target
        const currentLength = target.value.length;
        setCharacterCount(currentLength);
    }
    const closeUpdateModal = () => {
        closeModal(); 
      };

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const updatedData = {
                ...updateClothingData,
                images: clothingItem.images,
              };

            const response = await axios.put(`${serverURL}/clothing/${clothesID}`, updatedData, {
                headers: { authorization: cookies.access_token },
              });

            updateItemData(updatedData)
            closeUpdateModal();
            window.location.reload()
        } catch(err) {
            console.error(err)
        }
    }

    return (
        // <!-- Main modal -->
        <div id="updateProductModal" aria-hidden="true" className="absolute top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                {/* <!-- Modal content --> */}
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    {/* <!-- Modal header --> */}
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Update Product
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 ropriceunded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal" onClick={closeUpdateModal}>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <form onSubmit={onSubmit}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="text" name="title" id="title" defaultValue={clothingItem.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex. Apple iMac 27&ldquo;" onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                                <input type="text" name="location" id="location" defaultValue={clothingItem.location} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Ex. Apple" onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input type="number" defaultValue={clothingItem.price} name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$299" onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" onChange={selectChange} defaultValue={clothingItem.category}>
                                    <option value="jackets">Jackets</option>
                                    <option value="hats">Hats</option>
                                    <option value="pants">Pants</option>
                                    <option value="sweaters">Sweaters</option>
                                    <option value="shirts">Shirts</option>
                                    <option value="footwear">Footwear</option>
                                    <option value="accessories">Accessories</option>
                                </select>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea name="description" id="description" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 " placeholder="Write a description..." defaultValue={clothingItem.description} onChange={(e) => {
                        handleChange(e);
                        countCharacters(e);
                        }}></textarea>                    
                            </div>
                            <div className="flex justify-end">{characterCount}/250</div>

                        </div>
                        <div className="flex items-center space-x-4">
                            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Update product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}