import { useState } from "react"
import { useGetUserID } from "../hooks/useGetUserID"
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"
import axios from "axios";

export const DeleteAccount = () => {
    const [cookies, _] = useCookies(["access_token"])
    const userID = useGetUserID();
    const navigate = useNavigate();
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const deleteModal = () => {
        setOpenDeleteModal(true)
    }

    const onClose = () => {
        setOpenDeleteModal(!openDeleteModal);
    }

    const deleteUser = async () => {
        try {
            await axios.delete(`/users/${userID}`, {
                headers: { authorization: cookies.access_token },
            })
            removeCookie("access_token")
            window.localStorage.removeItem("userID");
            navigate("/")
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    return (
        <>
            <h1 className="font-bold text-2xl m-5">Delete Account</h1>
            <p className="m-2">Delete your account and all your data. This cannot be changed once done.</p>
            <button className="hover-opacity border rounded-full text-xs p-1 md:p-3 bg-red-500 text-white h-10" onClick={deleteModal}>DELETE ACCOUNT</button>

            {
                openDeleteModal && (
                    <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">
                      Are you sure?
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={onClose}
                    >
                      <span className=" text-black h-6 w-6 text-lg block outline-none focus:outline-none">
                        X
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
               Once we delete, there's no going back!
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-white bg-red-500 rounded-lg font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={deleteUser}
                    >
                      YES, DELETE.
                    </button>

                    <button
                      className="text-white bg-blue-500 rounded-lg font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={onClose}
                    >
                      I changed my mind.
                    </button>
    
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
                )
            }
        </>
       
    )
}