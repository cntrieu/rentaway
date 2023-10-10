import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom"

export const MessageUser = ({userID, clothingOwner, closeModal}) => {

    const [cookies, _] = useCookies(["access_token"])
    const serverURL = import.meta.env.VITE_API_BASE_URL;
    const [createMessage, setCreateMessage] = useState({
        conversationId: "",
        sender: "",
        text: ""
    })

    const [sentModal, setSentModal] = useState(false)
    console.log(sentModal)
    const handleChange = (event) => {
        const {name, value} = event.target;
        setCreateMessage({...createMessage, [name]: value});
    }

    const closeMessageModal = () => {
        closeModal(); 
      };

    const onSubmit = (e) => {
        e.preventDefault();
      
        axios.post(`${serverURL}/api/conversation`,
            {
              senderID: userID,
              receiverID: clothingOwner._id,
            },
            {
              headers: { authorization: cookies.access_token },
            }
          )
          .then((response) => {
         
                axios.post(`${serverURL}/api/messages`, 
                {
                    conversationId: response.data._id,
                    sender: userID,
                    text: createMessage.text
                }, 
                {
                    headers: { authorization: cookies.access_token },
                })
            
            setSentModal(true)
          })
          .catch((err) => {
            console.log(err);
          });
    };

    return (
        // <!-- Main modal -->
        <div aria-hidden="true" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                {/* <!-- Modal content --> */}
            {sentModal ? 
                     <div className="relative p-4 bg-white rounded-lg shadow  sm:p-5">
                     {/* <!-- Modal header --> */}
                     <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 ">
                         <h3 className="text-lg font-semibold text-gray-900">
                             Your Message Has Been Sent!
                         </h3>
                         <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 ropriceunded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="MessageProductModal" onClick={closeMessageModal}>
                             <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                             <span className="sr-only">Close modal</span>
                         </button>
                     </div>
            
                         <div className="flex items-center space-x-4">
                             <Link className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" to="/messenger">
                                 View Messages
                             </Link>
                             <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={closeMessageModal}>
                                 Close
                             </button>
                         </div>
                    
                 </div>
                :
                <div className="relative p-4 bg-white rounded-lg shadow  sm:p-5">
                {/* <!-- Modal header --> */}
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 ">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Send Message
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 ropriceunded-lg text-sm p-1.5 ml-auto inline-flex items-center "  onClick={closeMessageModal}>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {/* <!-- Modal body --> */}
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                            <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 ">To: {clothingOwner.username}</label>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 font-bold">Message:</label>
                            <textarea name="text" id="text" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 " placeholder="Hi, I'd like to rent your item on..."  onChange={(e) => {
                    handleChange(e);

                    }}></textarea>                    
                        </div>
                    

                    </div>
                    <div className="flex items-center space-x-4">
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Send Message
                        </button>
                    </div>
                </form>
            </div> 
                                }
            </div>
        </div>
        )
}