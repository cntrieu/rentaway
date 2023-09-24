import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetUserID } from "../hooks/useGetUserID"
import { getDateTime } from '../hooks/getDateTime';
import { useCookies } from "react-cookie"


export const Reviews = ({clothesID}) => {
    const [cookies, _] = useCookies(["access_token"])
    const navigate = useNavigate()
    const userID = useGetUserID();
    const timestamp = getDateTime()
    console.log(clothesID)

    // default rating if user does not select a rating
    let rating = "1";
  
    const [review, setReview] = useState({
        reviewer: userID,
        clothingId: clothesID,
        rating,
        comment: "",
        timestamp,
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setReview({...review, [name]: value});
    }

    const selectChange = (e) => {
        const selectedValue = e.target.value;
        const updatedReview = { ...review, rating: selectedValue };
        setReview(updatedReview)
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(review)
        try {
            await axios.post(`http://localhost:3001/clothing/${clothesID}/reviews`, review);
            alert("Your review has been added!")
            // navigate("/clothing");
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <div>
        <div className="border bg-gray-200 p-4 m-4 rounded-2xl">
            <h1>REVIEWS</h1>
            <div>
                
            </div>
        </div>

        <div className="">
        <form onSubmit={onSubmit}>

            <div className="text-2xl mt-4">
                <h2><label htmlFor="rating">Rating</label></h2>
                <select id="rating" className="border border-gray-500 my-1 py-2 px-3 rounded-lg" onChange={selectChange}>
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
    </div>
    </div>
    )
}