import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from "../hooks/useGetUserID"
import { getDateTime } from '../hooks/getDateTime';
import { useCookies } from "react-cookie"
import { GetAverage } from '../hooks/getAverage';


export const Reviews = ({clothesId}) => {
    const [cookies, _] = useCookies(["access_token"])
    const navigate = useNavigate()
    const userID = useGetUserID();
    const timestamp = getDateTime()
    const serverURL = import.meta.env.VITE_API_BASE_URL;
    // default rating if user does not select a rating
    let rating = "1";
  
    const [review, setReview] = useState({
        reviewer: userID,
        clothesId,
        rating,
        comment: "",
        timestamp,
    });

    const [retrieveReviews, setRetrieveReviews] = useState([])
    const [getReviewerInfo, setGetReviewerInfo] = useState([])
    const getAverage = GetAverage(retrieveReviews)

    useEffect(() => {
        const getReviews = async () => {
            try {
                const response = await axios.get(`${serverURL}/clothing/${clothesId}/reviews`);
               setRetrieveReviews(response.data)
            
            } catch(err) {
                console.error(err)
            }
        }


        getReviews()
    
    }, [])

    // Had to put in separate useEffect block for it to work
    useEffect(() => {
        const getUsernames = async() => {
            try {
                const getUsernamePromises = retrieveReviews.map(async(review) => {
                    const response = await axios.get(`${serverURL}/users/${review.reviewer}`);
                    return response.data;
                })
    
                const reviewerInfo = await Promise.all(getUsernamePromises)
                setGetReviewerInfo(reviewerInfo);
            } catch (err) {
                console.error(err);
            }
        }

        getUsernames()
    }, [retrieveReviews])


    const handleChange = (event) => {
        const {name, value} = event.target;
        setReview({...review, [name]: value});
    }

    const selectChange = (e) => {
        const selectedValue = e.target.value;
        const updatedReview = { ...review, rating: selectedValue };
        setReview(updatedReview)
    }

    const refetchReviews = async() => {
        try {
            const response = await axios.get(`${serverURL}/clothing/${clothesId}/reviews`);
           setRetrieveReviews(response.data)
        
        } catch(err) {
            console.error(err)
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${serverURL}/clothing/${clothesId}/reviews`, review);
            alert("Your review has been added!")
            refetchReviews()
        } catch (err) {
            console.error(err)
        }
    }


    return(
        
            <div>
            <div className="border bg-gray-200 p-4 m-4 rounded-2xl">
                <div className="flex justify-between">
                    <h1 className="font-bold md:text-3xl text-center">Reviews</h1>
                    <h2><strong>Average Rating:</strong> {getAverage}</h2>
                </div>
                
                <div>
                    {

                        retrieveReviews.length > 0 ? retrieveReviews.map((review) => {
                            const reviewerInfo = getReviewerInfo.find((info) => info._id == review.reviewer);
                            return (
                            <div key={review._id} className="border bg-gray-100 rounded-xl my-4 p-4">
                                <div className="flex justify-between">
                                    <div> <strong>Posted by: </strong> {' '}
                                        {reviewerInfo ? reviewerInfo.username : 'Unknown User'}
                                    </div>
                                    <div>
                                        <strong>Rating:</strong> {review.rating}
                                    </div>
                                </div>
                                <div className="text-xs mb-2">
                                    {review.timestamp}
                                </div>

                                    <div>{review.comment}</div>
                                    
                                    
                                
                            </div>
                            )
                        }) : 
                        <h2>No Reviews... yet!</h2>
                    }
                </div>
            </div>

            <div className="">
                { cookies.access_token ? 
            <form onSubmit={onSubmit}>

                <div className="text-2xl mt-4">
                    <h2><label htmlFor="rating">Rating</label></h2>
                    <select id="rating" className="border border-gray-500 my-1 py-2 px-3 rounded-lg w-9/12 text-xs sm:text-base" onChange={selectChange}>
                        <option value="1">1 - BAD</option>
                        <option value="2">2 - Needs Improvement</option>
                        <option value="3">3 - Decent</option>
                        <option value="4">4 - Good</option>
                        <option value="5">5 - EXCELLENT</option>
                    </select>
                </div>

                <div className="text-2xl mt-4">
                    <h2><label htmlFor="comment">Comment</label></h2>
                    <textarea id="comment" name="comment" className="border border-gray-500 my-1 py-2 px-3 rounded-lg w-full" placeholder="tell us a story about the item..." onChange={handleChange}></textarea>
                </div>

                <button type="submit" className="border rounded-lg border-orange-900 bg-amber-700 text-white p-3 mb-6">Submit Review</button>
            </form>
            :
            <Link to={"/auth/login"} className="m-3">You must login to leave a review</Link>
                }
        </div>
        </div>
    )
}