import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import ListingItem from '../components/ListingItem'
import 'swiper/css/bundle'


export default function Home()
{

  const [offerListings,setofferListings] =useState([])
  const [saleListings ,setSaleListings] = useState([])
  const [rentListings,setrentListings] = useState([])
  SwiperCore.use([Navigation])


  useEffect(()=>
  {
    const fetchofferListings = async ()=>
    {
        try {
          const res = await fetch(`/api/listing/get?offer=true&limit=4`)
          const data = await res.json()
          setofferListings(data)
          fetchRentListings()
        } catch (error) {
          console.log(error)
        }
    }

    const fetchRentListings = async ()=>
    {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`)
        const data = await res.json()
        setrentListings(data)
        fetchSaleListings()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaleListings = async()=>
    {
      try {
        const res = await fetch(`/api/listing/get?type=sell&limit=4`)
        const data = await res.json()
        setSaleListings(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchofferListings()
  },[])


    return (
        <div>
         
         {/*top*/}

         <div className='flex flex-col gap-6 p-28 max-w-6xl mx-auto'>

            <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
              Find your next <span className='text-slate-500'>perfect</span> place with ease
            </h1>

            <div className='text-gray-400 text-xs sm:text-sm'>
             FaizanEstate is the best place to find your next perfect place to live
             <br />
             We have a wide range of properties for you to choose from
            </div>

            <Link to = {'/search'} className='text-xs sm:text-sm text-blue-800
            font-bold hover:underline'>
              Let's get started......
            </Link>
            
             </div>

           {/*swiper*/}

           <Swiper navigation>
           {
            offerListings && offerListings.length > 0 && 
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{ background: `url(${listing.imageUrls?.[0]}) center no-repeat`,backgroundSize: "cover" }}
                  className='h-[500px]'
                />
              </SwiperSlide>
            ))
           }
           </Swiper>

            {/*  */}
          
             <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
               {
               offerListings && offerListings.length > 0 && (
                 <>
                  <div className='my-3'>
                    <h2 className='text-2xl font-semibold text-slate-600'>
                     Recent Offers
                    </h2>

                    <Link className='text-sm text-blue-600 hover:underline'
                     to ={'/search?offer=true'}>
                    Show more Offers
                    </Link>
                  </div>
                  <div className='flex flex-wrap gap-4'>
                    {
                      offerListings.map((listing) =>
                      {
                        return <ListingItem listing={listing} key={listing._id}/>
                      })
                    }
                  </div>
                 </>
                
               )
               }

                {
               rentListings && rentListings.length > 0 && (
                 <>
                  <div className='my-3'>
                    <h2 className='text-2xl font-semibold text-slate-600'>
                     Recent Places For Rent
                    </h2>

                    <Link className='text-sm text-blue-600 hover:underline'
                     to ={'/search?type=rent'}>
                    Show more Places for Rent
                    </Link>
                  </div>
                  <div className='flex flex-wrap gap-4'>
                    {
                      rentListings.map((listing) =>
                      {
                        return <ListingItem listing={listing} key={listing._id}/>
                      })
                    }
                  </div>
                 </>
                
               )
               }

                {
              saleListings && saleListings.length > 0 && (
                 <>
                  <div className='my-3'>
                    <h2 className='text-2xl font-semibold text-slate-600'>
                     Recent Places for Sale
                    </h2>

                    <Link className='text-sm text-blue-600 hover:underline'
                     to ={'/search?type=sell'}>
                    Show more Places for Sale
                    </Link>
                  </div>
                  <div className='flex flex-wrap gap-4'>
                    {
                      saleListings.map((listing) =>
                      {
                        return <ListingItem listing={listing} key={listing._id}/>
                      })
                    }
                  </div>
                 </>
                
               )
               }
             </div> 
               </div>
    )
}