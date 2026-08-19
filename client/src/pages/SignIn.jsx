/* eslint-disable no-unused-vars */
  import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector  } from "react-redux"
import { signInStart,signInFailure,signInSuccess } from "../redux/user/UserSlice"
import OAuth from "../components/OAuth";


  function SignIn()
 {

   const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const[formData,setFormData] = useState({
    username: "",
    email: "",
    password:""

  })

  function handleChange(e)
  {
     setFormData({
      ...formData,
      [e.target.id] : e.target.value
     })
  }

  async function handlesubmit(e)
  {
     e.preventDefault()

     try {
      dispatch(signInStart())
     const res = await fetch('/api/auth/sign-in',
      {
        method: 'POST',
        headers:
        {
          'Content-Type' : 'application/json'

        },
        body: JSON.stringify(formData)
      },
     
     )
     const data = await res.json()
     if(data.success === false)
     {
      dispatch(signInFailure(data.message))
      return;
     }
     dispatch(signInSuccess(data))
     navigate('/')
    }
      catch (error) {
     dispatch(signInFailure(error.message))
     }
    
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold
      my-7">Sign In</h1>

      <form onSubmit={handlesubmit} className="flex flex-col gap-2">
        
        <input  onChange={handleChange} type="email" placeholder="email" className="border p-3 rounded-lg" id="email" />

        <input onChange={handleChange} type="password" placeholder="password" className="border p-3 rounded-lg" id="password" />

        <button  disabled={loading} className="bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading!!.." : "SignIn"}</button>
          <OAuth/>
      </form>

      <div className="gap-2  mt-5 flex">
        <p>
          Dont Have an Account?
        </p>
        <Link to = '/sign-up'>
        <span className="text-blue-800">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-600 mt-5">{error}</p>  }
    </div>
  )
  }


  export default SignIn