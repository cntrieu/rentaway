import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export const AddClothes = () => {
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"])
    const [characterCount, setCharacterCount] = useState(0);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [missingFields, setMissingFields] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [addedClothing, setAddedClothing] = useState("")
    const [uploadedPhotosCount, setUploadedPhotosCount] = useState(0);
    const [showReturnButton, setShowReturnButton] = useState(false);
    const maxPhotos = 5;
    const serverURL = import.meta.env.VITE_API_BASE_URL;
    const backendURL = import.meta.env.VITE_API_BACKEND_URL;
    const [clothing, setClothing] = useState({
        title: "",
        description: "",
        category: "",
        location: "",
        price: 0,
        images: [],
        userOwner: userID,
    });

    useEffect(() => {
        // Check if the clothing state has images and is ready to submit
        if (clothing.images.length > 0) {
            postClothing()
        }
      }, [clothing.images]); // Only trigger this effect when the clothing.images state changes

    const handleChange = (event) => {
        const {name, value} = event.target;
        setClothing({...clothing, [name]: value});
    }

    const selectChange = (e) => {
        const selectedValue = e.target.value
        const updatedClothing = { ...clothing, category: selectedValue };
        setClothing(updatedClothing)
    }

    const setErrorWithTimeout = (message, timeout = 5000) => {
        setMissingFields(message);
        setTimeout(() => {
            setMissingFields(null);
        }, timeout);
      };

    const highlightMissing = () => {
        if(!title.value || !userLocation.value || !price.value || !description.value) {
            return `border-red-500`;
        }
    }
 
    const onSubmit = async (event) => {
        event.preventDefault();
        if(!title.value || !userLocation.value || !price.value || !description.value) {
            setErrorWithTimeout("Please fill out all required fields and have photos uploaded")
            highlightMissing();
            return;
        }

        const form = event.currentTarget;
        const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');
        const selectedFiles = Array.from(fileInput.files);

        const uploadPromises = selectedFiles.slice(0, maxPhotos).map(async (file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'rentAway-uploads');
        
            return axios.post("https://api.cloudinary.com/v1_1/dsvlxgsi3/image/upload", formData, {
                headers: {'Content-type': "multipart/form-data"}
            })
              .then((response) => {
                console.log(response.data.secure_url);
                return response.data.secure_url; 
              });
          });
        
          try {
            const imageUrls = await Promise.all(uploadPromises);
            setClothing((prevClothing) => ({
                ...prevClothing,
                images: [...prevClothing.images, ...imageUrls],
              }));

              // set back to 0 to remove maximum photos count
              setUploadedPhotosCount(0);
            // postClothing is called in useEffect when length > 0 (that's the only way I could get images to be appended with the post request) 
            // and postclothing is called here when it is 0 
            if (imageUrls.length === 0) {
                postClothing();
              } 
          } catch (error) {
            console.error(error);
          }
    }

    const postClothing = async() => {
   
        try {
            const response = await axios.post(`${serverURL}/clothing`, clothing, {
                headers: { authorization: cookies.access_token },
              });
            
            title.value = ""
            userLocation.value = ""
            price.value = ""
            description.value = ""

            setAddedPhotos([]); // Clear uploaded photos
            // Add id to state so user can view listing right away
            setAddedClothing(response.data._id)
            setShowSuccess(true)
    
        } catch (err) {
            console.error(err)
        }
    }

    const uploadPhoto = (event) => {

        if (uploadedPhotosCount >= maxPhotos) {
            // Display an error message or take appropriate action.
            return;
        }

        const files = event.target.files;
        const data = new FormData();
        const newPhotosCount = Math.min(maxPhotos - uploadedPhotosCount, files.length)
        for (let i = 0; i < newPhotosCount; i++) {
            data.append('photos', files[i])
        }

        setUploadedPhotosCount((prevCount) => prevCount + newPhotosCount);

        axios.post(`${backendURL}/upload`, data, {
            headers: {'Content-type': "multipart/form-data"}
        }).then(response => {
            const {data: filenames} = response;

            setAddedPhotos(prev => [...prev, ...filenames])
        })
    }

    const dismiss = () => {
        setShowSuccess(!showSuccess)
    }

    const countCharacters = (e) => {
        const target = e.target
        const currentLength = target.value.length;
        setCharacterCount(currentLength);
    }


    return (
    <div className="w-9/12 mx-auto flex-grow m-5">
        <h2 className="md:text-3xl">Add Your Clothing to Rent!</h2>

        <p className="text-xs md:text-base">* indicates a required field</p>
        <div className="">
            <form onSubmit={onSubmit}>
                <div className="text-base md:text-2xl mt-4">
                    <h2><label htmlFor="title">Title*</label></h2>
                    <input type="text" maxlength="20" id="title" name="title" placeholder="North Face" className={`border border-gray-500 my-1 py-2 px-3 rounded-lg`} onChange={handleChange}/>
                </div>

                <div className="text-base md:text-2xl mt-4">
                    <h2><label htmlFor="category">Category*</label></h2>
                        <select id="category" className="border border-gray-500 my-1 py-2 px-3 rounded-lg" onChange={selectChange}>
                            <option value="jackets">Jackets</option>
                            <option value="hats">Hats</option>
                            <option value="pants">Pants</option>
                            <option value="sweaters">Sweaters</option>
                            <option value="shirts">Shirts</option>
                            <option value="footwear">Footwear</option>
                            <option value="accessories">Accessories</option>
                        </select>
                </div>

                <div className="text-base md:text-2xl mt-4">
                    <h2><label htmlFor="location">Location*</label></h2>
                    <input type="text" maxlength="20" id="userLocation" name="location" placeholder="Toronto" className="border border-gray-500 my-1 py-2 px-3 rounded-lg" onChange={handleChange}/>
                </div>
                
                <div className="text-base md:text-2xl mt-4">
                    <h2><label htmlFor="price">Price Per Day*</label></h2>
                    <input type="number" max="1000" id="price" name ="price" placeholder="$25"className="border border-gray-500 my-1 py-2 px-3 rounded-lg" onChange={handleChange}/>
                </div>

                
                <div className="text-base md:text-2xl mt-4">
                    <h2><label htmlFor="description">Description*</label></h2>
                    <textarea maxLength="250" id="description" name="description" className="border border-gray-500 my-1 p-4 rounded-lg w-full" placeholder="tell us a story about the item..." onChange={(e) => {
                        handleChange(e);
                        countCharacters(e);
                        }}></textarea>
                </div>
                <div className="flex justify-end">{characterCount}/250</div>

                <div className="text-base md:text-2xl mt-4">
                    <h2><label htmlFor="images">Photos (max 5)</label></h2>
                    <div className="mt-3 mb-3 grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                     
                    {addedPhotos.length > 0 && addedPhotos.map(link => (
                      
                        <div key={link} className="md:h-32 flex m-6"> 
                            <img className="rounded-2xl" src={`${backendURL}/uploads/${link}`} alt={`Uploaded Image`} style={{ width: '150px', height: '150px' }} />
                        </div>
                    ))}
                        {uploadedPhotosCount >= maxPhotos &&  (
                        <div className="text-red-500">Maximum photos reached</div>
                        )}
                        <div className="flex items-center">
                            <label className="md:h-32 cursor-pointer flex gap-1 justify-center border bg-transparent rounded-2xl p-4 md:p-8 text-2xl text-gray-600" type="button">
                            <input type="file" multiple className="hidden" id="file" name="file" onChange={uploadPhoto} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload
                            </label>
                        </div>
                
                    </div>
                </div>

                {missingFields && (
                                    <div className="error-message text-red-400 font-bold">{missingFields}</div>
                                )}

                     { showSuccess &&
                            <div id="alert-additional-content-3" className="p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                            <div className="flex items-center">
                              <svg className="flex-shrink-0 w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                              </svg>
                              <span className="sr-only">Info</span>
                              <h3 className="text-lg font-medium">Your Item Has Been Posted!</h3>
                            </div>
                            <div className="mt-2 mb-4 text-sm">
                       
                            </div>
                            <div className="flex gap-6">
    
                              <Link type="button" className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800" data-dismiss-target="#alert-additional-content-3" aria-label="Close" to={ `/clothing/${addedClothing}`}>
                                View Listing
                              </Link>
                              <button type="button" className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800" data-dismiss-target="#alert-additional-content-3" aria-label="Close" onClick={dismiss}>
                                Dismiss
                              </button>
                            </div>
                          </div>
                    }
                <button type="submit" className="border rounded-lg w-full border-orange-900 bg-amber-700 text-white p-3 mt-10">Create Listing</button>
            </form>
        </div>
    </div>
    )
}