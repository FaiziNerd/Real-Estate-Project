/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux"
import { useRef, useState } from "react"
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart } from "../redux/user/UserSlice"
import {Link} from "react-router-dom"

function Profile ()
{

    const {currentUser} = useSelector((state) => state.user)
    const FileRef = useRef(null)
    const [file, setFile] = useState(null)
    const dispatch = useDispatch();
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)

    const [FormDataState, setFormDataState] = useState({
        username: currentUser.username,
        email: currentUser.email,
        password: '',
    })

    const [filePreview, setfilePreview] = useState(currentUser.avatar)
    

    function handleChange(e)
    {
      setFormDataState({
        ...FormDataState,
        [e.target.id]: e.target.value
      })
    }

    function handleFileChange(e)
    {
        const selectedFile = e.target.files[0]
        if(!selectedFile) return ;

        setFile(selectedFile)

        setfilePreview(URL.createObjectURL(selectedFile))
    }


    async function handleSubmit(e)
    {
     e.preventDefault()

     try {
        setError("")
        setLoading(true)

        const data = new FormData()
        data.append('username',FormDataState.username)
        data.append('email', FormDataState.email)

        if(FormDataState.password)
        {
            data.append("password", FormDataState.password)
        }

        if(file)
        {
            data.append("avatar", file)
        }

        const res = await fetch('/api/user/update',
            {
                method: "POST",
                credentials: "include",
                body: data,
            })

            const result = await res.json()


            if(!res.ok)
            {
                throw new Error(
                    result.message || "Something went Wrong"
                )
            }

            console.log("Updated User:", result)
        


     } catch (error) {
        setError(error.message)
     } finally 
     {
        setLoading(false)
     }
    }


    async function handleDeleteUser()
    {
       try {
        dispatch(deleteUserStart())

        const res = await fetch(`/api/user/delete/${currentUser._id}`,{
           credentials: "include",
            method: "DELETE"
        })

        const data = await res.json()

        if(data.success === false)
        {
            dispatch(deleteUserFailure(data.message))
            return 
        }

        dispatch(deleteUserSuccess(data))



       } catch (error) {
        dispatch(deleteUserFailure(error.message))
       }
    }

    const handleSignOut = async () =>
    {
      try {
        dispatch(signOutUserStart())
        const res = await fetch(`/api/auth/signout`)
        const data = await res.json()
        if(data.sucess === false)
        {
            dispatch(deleteUserFailure(data.message))
        }

        dispatch(deleteUserSuccess(data))
        return 
      } catch (error) {
        dispatch(deleteUserFailure(data.message))
      }
    }

return (
    <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center
        my-7">Profile</h1>

        <form onSubmit={handleSubmit}   className="flex flex-col gap-4">
            <input type="file" ref={FileRef} hidden accept="image/*" onChange={handleFileChange}/>
            <img onClick = {()=> FileRef.current.click()}src= {filePreview} alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center
            " />

            <input value={FormDataState.username} type="text" placeholder="username" id="username"
            className = "border p-3 rounded-lg bg-white" onChange={handleChange}/>


            <input value={FormDataState.email} type="email" placeholder="email" id="email"
            className = "border p-3 rounded-lg bg-white" onChange={handleChange}/>


             <input  value = {FormDataState.password} type="password" placeholder="password" id="password"
            className = "border p-3 rounded-lg bg-white" onChange={handleChange}/>

            <button disabled={loading} type = "submit" className="bg-slate-700 p-3 text-white rounded-lg
            hover:opacity-95 disbaled: opacity-80">{loading ? "UPDATING" : "UPDATE"}</button>

            <Link  className="bg-green-700 text-white p-3 rounded-lg
            uppercase text-center hover: opacity-95" to= {"/create-listing"}>
            Create Listing
            </Link>

            {error && (
                <p className="text-red-500">{error}</p>
            )}

        </form>

        <div className="flex justify-between mt-5">
            <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
            <span onClick = {handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>

        </div>


    </div>
 )
}

export default Profile 