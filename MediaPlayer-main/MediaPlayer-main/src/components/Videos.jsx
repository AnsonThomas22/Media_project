import React,{useEffect,useState} from 'react'
import { Row,Col } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getVideos } from '../services/allApis'

function Videos({add}) {

    const [videos,setVideos]=useState([])


    useEffect(()=>{
        getData()
    },[add])

    const getData=async()=>{
        const res=await getVideos()
        console.log(res);
        if(res.status==200){
            setVideos(res.data)
        }
        else{
            console.log(res)
        }
    }

    return (
        <>

            <div className="border border-3 shadow p-5 mb-3">
                {
                    videos.length>0 ?
                
                <Row>
                    {
                        videos.map(item=>(
                            <Col>
                        <VideoCard video={item} />
                        </Col>
                        ))
                    }
                    
                </Row>
                :
                <h2 className='text-center text-danger'>No Videos Available</h2>
                }


            </div>
        </>
    )
}

export default Videos