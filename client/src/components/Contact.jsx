import {useState,useEffect} from 'react'


function Contact({listing})
{

    const [landlord,setlandlord] = useState(null)
    const [message,setmessage] = useState('')
    const [loadError, setLoadError] = useState('')

    const onChange = (e)=>
    {
        setmessage(e.target.value)
    }

    useEffect(()=>
    {
     const fetchLandLord = async() =>
     {
        try {
            const res = await fetch(`/api/user/${listing.userRef}`, {
                credentials: 'include',
            })
            const data = await res.json()
            if (!res.ok || data.success === false) {
              setLoadError('Owner details could not be loaded. Refresh the page and try again.')
              return
            }
            setlandlord(data)

        } catch {
            setLoadError('Owner details could not be loaded. Check your connection and try again.')
        }
     }
     fetchLandLord()
    },[listing.userRef])
 return(
    <>
    {loadError && <p className="field-error text-sm" role="alert">{loadError}</p>}
    {landlord && (
        <div className='flex flex-col gap-2'>
           <p className="text-pretty">Contact <span className='font-semibold'>{landlord.username}</span> about <span className='font-semibold'>
            {listing.name}</span></p>
            <label htmlFor="message" className="field-label">Message</label>
            <textarea name="message" id="message"  rows="2"
             value={message} onChange={onChange}
             placeholder='I would like to tour this home on Saturday…' 
             className='input-field min-h-24'></textarea>

             <a href={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
             className='btn-primary text-center'>Send message</a>
        </div>
    )}
    
    </>
 )
}




export default Contact
