/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux"
import { useRef, useState } from "react"


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

return (
    <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center
        my-7">Profile</h1>

        <form onSubmit={handleSubmit}   className="flex flex-col gap-4">
            <input type="file" ref={FileRef} hidden accept="image/*" onChange={handleFileChange}/>
            <img onClick = {()=> FileRef.current.click()}src= {filePreview} alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center
            " />

            <input value={FormData.username} type="text" placeholder="username" id="username"
            className = "border p-3 rounded-lg bg-white" onChange={handleChange}/>


            <input value={FormData.email} type="email" placeholder="email" id="email"
            className = "border p-3 rounded-lg bg-white" onChange={handleChange}/>


             <input  value = {FormData.password} type="password" placeholder="password" id="password"
            className = "border p-3 rounded-lg bg-white" onChange={handleChange}/>

            <button disabled={loading} type = "submit" className="bg-slate-700 p-3 text-white rounded-lg
            hover:opacity-95 disbaled: opacity-80">{loading ? "UPDATING" : "UPDATE"}</button>

            {error && (
                <p className="text-red-500">{error}</p>
            )}

        </form>

        <div className="flex justify-between mt-5">
            <span className="text-red-700 cursor-pointer">Delete Account</span>
            <span className="text-red-700 cursor-pointer">Sign Out</span>

        </div>


    </div>
 )
}

export default Profile 