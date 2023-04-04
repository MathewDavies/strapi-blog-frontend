import { useParams } from 'react-router-dom'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import useFetchSinglePost from '../hooks/usefetchSinglePost';


function Single() {
  const {id} = useParams();
  const { data, loading, error} = useFetchSinglePost(id)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  
  if(data)return (
    <div>    
        <div className="review-card">
          <h2>{data.title}</h2> 
          <div className="cover-image-container">
            <img className="cover-image" src={"http://localhost:1337" + data.image} alt="" />
          </div>      
          <ReactMarkdown>{data.article}</ReactMarkdown>
        </div>   
      </div>
  )
}

export default Single