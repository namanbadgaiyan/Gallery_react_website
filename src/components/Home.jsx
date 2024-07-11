import axios from "axios"
import { useEffect, useState } from "react"


const Home = () => {
    const [query, setQuery] = useState("")
    const [Data , setData] = useState([])
    const GetPhotos = () => {
        const photos = axios(`https://api.unsplash.com/search/`)
        // const photos = axios(`https://www.pexels.com/search/${query}`,{headers: {Authorization: process.env.API_KEY}})
        photos.then((res) => {
            setData(res);
        })
    }


    useEffect(()=>{
        GetPhotos();
    });

    const OnEnterHandler = (e) => {
        if(e.keyCode === 13){
            GetPhotos();
        }
    }


    return (
        <div className="px-5 py-7 bg-zinc-700 w-full min-h-[89.1vh]">
            <div className="flex gap-3 w-full px-12">
                <input type="text"
                    placeholder="Search for free photos"
                    onKeyDown={OnEnterHandler}
                    onChange={(e)=>{setQuery(e.target.value)}}
                    value={query}
                    className="border rounded px-5 py-2 w-[80vw]"
                    />
                <button onClick={OnEnterHandler} className="px-5 py-2 bg-orange-500 font-semibold">Get Photos</button>
            </div>
            <div className="w-full">
                {Data?.map((item,index)=>{
                    return (
                        <div className="" key={index}>
                            <img className="object-cover" src= {item.src.medium} alt={item.id} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Home