 
  import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import OAuth from "../components/OAuth"


  function SignUp()
 {

  const[error,setError] = useState(null)
  const[loading,setloading] = useState(false)
  const navigate = useNavigate()

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
      setloading(true)
     const res = await fetch('/api/auth/sign-up',
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
      setError(data.message)
      setloading(false)
      return;
     }
     setloading(false)
     setError(null)
     navigate('/sign-in')
    }
      catch (error) {
      setloading(false)   
      setError(error.message)
     }
    
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold
      my-7">Sign Up</h1>

      <form onSubmit={handlesubmit} className="flex flex-col gap-2">
        <input  onChange={handleChange} type="text" placeholder="username" className="border p-3 rounded-lg" id="username" />

        <input  onChange={handleChange} type="email" placeholder="email" className="border p-3 rounded-lg" id="email" />

        <input onChange={handleChange} type="password" placeholder="password" className="border p-3 rounded-lg" id="password" />

        <button  disabled={loading} className="bg-slate-700 text-white p-3
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading!!.." : "SignUp"}</button>
          <OAuth/>

      </form>

      <div className="gap-2  mt-5 flex">
        <p>
          Have an Account
        </p>
        <Link to = '/sign-in'>
        <span className="text-blue-800">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-600 mt-5">{error}</p>  }
    </div>
  )
  }


  export default SignUp