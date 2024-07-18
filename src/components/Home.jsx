import axios from "../utils/Axios";
import { useEffect, useRef, useState } from "react";

const Home = () => {

    const [Photos, setPhotos] = useState([])
    const [pg, setpg] = useState(1)
    const [pages, setpages] = useState(0)
    const [errorMsg, seterrorMsg] = useState('')
    
    const image_Per_Page = 28;
    
    const searchInput = useRef(null)
    
    const searchHandler = (e) => {
        e.preventDefault()
        setpg(1)
        fetchPhotos()
    }

    const settingsearch = (value) =>{
        searchInput.current.value = value
        setpg(1)
        fetchPhotos()
    }
    
    useEffect(()=>{
        fetchPhotos()
    },[pg])
    
    const fetchPhotos = async () => {
        try {
            const query = searchInput.current.value || 'random'
            const {data} = await axios.get(`?query=${query}&page=${pg}&per_page=${image_Per_Page}&client_id=${import.meta.env.VITE_API_KEY}`)
            seterrorMsg('')
            setPhotos(data.results)
            setpages(data.total_pages)
        } catch (error) {
            seterrorMsg('Having problem searching for this')
            console.log(error);
        }
    }
    
    
    

    return (
        <div className="px-5 py-7 bg-[#FAF0CA] w-full min-h-[89.1vh]">
    
            <form action="" className="flex justify-center w-full gap-3 px-12 my-5">                    
                <input type="search"
                    placeholder="Search for free photos"
                    onSubmit={searchHandler}
                    ref={searchInput}
                    className="border-2 rounded px-5 py-2 w-[55vw] outline-none hover:border-[#EE964B]"
                    />
                <button onClick={searchHandler} className="px-5 py-2 font-semibold text-[1.2vw] bg-[#F95738] text-[#FAF0CA] rounded hover:scale-105">Get Photos</button>
            </form>
            
            {errorMsg && <div className="my-2 text-center text-red-500">{errorMsg}</div>}
            <div className="flex items-center justify-center w-full gap-6 my-5 mt-8">
                <h1 onClick={()=>{settingsearch('nature')}} className="px-5 py-1  rounded-lg font-semibold bg-[#F4D35E] text-[1.3vw] text-[#F95738] capitalize hover:rounded-none">nature</h1>
                <h1 onClick={()=>{settingsearch('birds')}} className="px-5 py-1 rounded-lg font-semibold bg-[#F4D35E] text-[1.3vw] text-[#F95738] capitalize hover:rounded-none">birds</h1>
                <h1 onClick={()=>{settingsearch('dogs')}} className="px-5 py-1  rounded-lg font-semibold bg-[#F4D35E] text-[1.3vw] text-[#F95738] capitalize hover:rounded-none">dogs</h1>
                <h1 onClick={()=>{settingsearch('cats')}} className="px-5 py-1  rounded-lg font-semibold bg-[#F4D35E] text-[1.3vw] text-[#F95738] capitalize hover:rounded-none">cats</h1>
                <h1 onClick={()=>{settingsearch('shoes')}} className="px-5 py-1 rounded-lg font-semibold bg-[#F4D35E] text-[1.3vw] text-[#F95738] capitalize hover:rounded-none">shoes</h1>
            </div>
            
            <div className="flex flex-wrap justify-center w-full px-10 py-5 mt-2 gap-x-2 gap-y-1">
                {Photos?.map((item)=>{
                        return (
                            <div className="min-w-[18vw] min-h-[30vh] max-h-[50vh] overflow-hidden max-w-[26vw] mr-3 mb-2 hover:scale-105 border border-[#323233] hover:border-[#EE964B]" key={item.id}>
                                <img className="object-cover w-full h-full" src= {item.urls.small} alt={item.alt_description} />
                            </div>
                        )
                    })}
            </div>

            <div className="flex items-center justify-center w-full gap-5">
                {pg > 1 && <button onClick={()=>{setpg(pg-1)}} className="px-5 py-2 font-semibold text-[1.2vw] bg-[#EE964B] text-[#FAF0CA] rounded hover:scale-105">Previous</button>}
                {pg < pages && <button onClick={()=>{setpg(pg+1)}} onMouseLeave={scroll()} className="px-5 py-2 font-semibold text-[1.2vw] bg-[#EE964B] text-[#FAF0CA] rounded hover:scale-105">Next</button>}
            </div>

        </div>
            
    )
}

export default Home