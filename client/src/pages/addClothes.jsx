import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const AddClothes = () => {
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"])
    const navigate = useNavigate()
    const [addedPhotos,setAddedPhotos] = useState([]);

    const [clothing, setClothing] = useState({
        brand: "",
        description: "",
        category: "",
        location: "",
        price: 0,
        images: [],
        userOwner: userID,
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setClothing({...clothing, [name]: value});
    }

    const selectChange = (e) => {
        const selectedValue = e.target.value
        const updatedClothing = { ...clothing, category: selectedValue };

        setClothing(updatedClothing)
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/clothing", clothing, {
                headers: {authorization: cookies.access_token
                },
            });
            alert("Your Item has been added!")
            navigate("/clothing");
        } catch (err) {
            console.error(err)
        }
    }

    const uploadPhoto = (e) => {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i])
        }
    
        axios.post('http://localhost:3001/upload', data, {
            headers: {'Content-type': "multipart/form-data"}
        }).then(response => {
            const {data: filenames} = response;
            setAddedPhotos(prev => {
                return [...prev, ...filenames];
            })
            console.log("addedPhotos", addedPhotos);
        })
    }

    return (
    <div className="m-5">
        <h2 className="text-3xl">Add Your Clothing to Rent!</h2>
        <div className="">
            <form onSubmit={onSubmit}>
                <div className="text-2xl mt-4">
                    <h2><label htmlFor="brand">Brand</label></h2>
                    <input type="text" id="brand" name="brand" placeholder="North Face" className="border border-gray-500 my-1 py-2 px-3 rounded-lg" onChange={handleChange}/>
                </div>

                <div className="text-2xl mt-4">
                    <h2><label htmlFor="category">Category</label></h2>
                        <select id="category" className="border border-gray-500 my-1 py-2 px-3 rounded-lg" onChange={selectChange}>
                            <option value="hats">Hats</option>
                            <option value="jackets">Jackets</option>
                            <option value="pants">Pants</option>
                            <option value="sweaters">Sweaters</option>
                            <option value="shirts">Shirts</option>
                            <option value="footwear">Footwear</option>
                            <option value="accessories">Accessories</option>
                        </select>
                </div>

                <div className="text-2xl mt-4">
                    <h2><label htmlFor="location">Location</label></h2>
                    <input type="text" id="location" name="location" placeholder="Toronto" className="border border-gray-500 my-1 py-2 px-3 rounded-lg" onChange={handleChange}/>
                </div>
                
                <div className="text-2xl mt-4">
                    <h2><label htmlFor="price">Price Per Day</label></h2>
                    <input type="number" id="price" name ="price" placeholder="$25"className="border border-gray-500 my-1 py-2 px-3 rounded-lg" onChange={handleChange}/>
                </div>

                <div className="text-2xl mt-4">
                    <h2><label htmlFor="images">Photos</label></h2>
                    <div className="mt-3 mb-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {addedPhotos.length > 0 && addedPhotos.map(link => {
                        <div>
                            <img src={'http://localhost:3001/uploads/' + link} />
                        </div>

                    })}
                        <label className="cursor-pointer flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600" type="button">
                        <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                            </svg>
                            Upload
                        </label>
                    </div>
                </div>

                <div className="text-2xl mt-4">
                    <h2><label htmlFor="description">Description</label></h2>
                    <textarea id="description" name="description" className="border border-gray-500 my-1 py-2 px-3 rounded-lg w-full" placeholder="tell us a story about the item..." onChange={handleChange}></textarea>
                </div>
                
                <button type="submit" className="border rounded-lg w-full border-orange-900 bg-amber-700 text-white p-3">Create Listing</button>
            </form>
        </div>
    </div>
    )
}