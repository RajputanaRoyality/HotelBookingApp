import React,{useEffect, useState} from 'react'
import './Hero.css'
import video1 from '../assets/video1.mp4'
import { TfiFacebook } from "react-icons/tfi";
import { FaInstagram } from "react-icons/fa";
import { SiTripadvisor } from "react-icons/si";
import { CiCircleList } from "react-icons/ci";
import { TbApps } from "react-icons/tb";

import Aos from 'aos'
import 'aos/dist/aos.css'
import { assets, cities } from '../assets/assets';
import { useAppContext } from '../context/AppContext';


const Hero = () => {

  const {navigate,getToken,axios,setSearchedCities} = useAppContext()
  const [destination,setDestination] = useState("")

  const onSearch = async (e) => {
    e.preventDefault();
    navigate(`/rooms?destination=${destination}`)
    //call api to save recent searched city
    await axios.post('/api/user/store-recent-search',{recentSearchedCity:destination},
      {headers:{Authorization: `Bearer ${await getToken()}`}}
    );

    //add destination to searchedcities max 3 recent searched cities
    setSearchedCities((prevSearchedCities)=>{
      const updatedSearchedCities = [...prevSearchedCities,destination];
      if(updatedSearchedCities.length > 3){
        updatedSearchedCities.shift();
      }
      return updatedSearchedCities;
    })
  }

  useEffect(()=>{
        Aos.init({duration:2000})
      },[])

      
  return (
    <section className='home z-[1]'>
      <div className="overlay"></div>
      <video src={video1} muted autoPlay loop type="vide0/mp4"></video>
      <form onSubmit={onSearch} className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>
      <div className="homeContent container  ">
        <div className="textDiv">
          <span data-aos="fade-up" className="smallText flex justify-center font-semibold">Ultimate Hotel Experience</span>
          <h1 data-aos="fade-up" className='homeTitle ml-30 lg:ml-145 font-bold'>Discover Your Perfect <br /> Gateway Destination</h1>
        </div>
        <div data-aos="fade-up" className="cardDiv grid">
          <div className="destinationInput">
            <label htmlFor="city">Search For Destination:</label>
            
              <input onChange={e=>setDestination(e.target.value)} value={destination} list='destinations' id='destinationsInput' className='text-black' type="text" placeholder='Enter name here...' required/>
              <datalist id='destinations'>
                {cities.map((city,index)=>(
                    <option value={city} key={index} />
                ))}
              </datalist>   
           
            
          </div>
          

          <div className="dateInput">
            <label htmlFor="date">Select your date:</label>
            <div className="input flex">
              <input className='text-black' type="date"/>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 ">
                <img src={assets.calenderIcon} alt="" className='h-4' />
                <label htmlFor="checkOut" className=''>Check Out</label>
            </div>
            <input id='checkOut' type="date" className='rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none text-black'/>
          </div>
          


          <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
            <label htmlFor="guests">Guests</label>
            <input min={1} max={4} type="number" 
            className='rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16 text-black' placeholder='0'/>
          </div>
          

          <button className='flex items-center justify-center gap-1 rounded-md
          bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1'>
            <img src={assets.searchIcon} alt="searchIcon" className='h-7'/>
            <span>Search</span>
          </button>

          </div>

          <div data-aos="fade-up" className="homeFooterIcons flex">
            <div className="rightIcons">
            <TfiFacebook className='icon'/>
            <FaInstagram className='icon'/>
            <SiTripadvisor className='icon'/>
            </div>
            <div className="leftIcons">
            <CiCircleList className='icon'/>
            <TbApps className='icon'/>
            </div>
          </div>
          </div>
          </form>
    </section>
  )
}

export default Hero