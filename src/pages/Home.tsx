import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Link } from 'react-router-dom';
import useFetchAllPosts from '../hooks/useFetchAllPosts';
import { useState } from 'react';


interface SinglePost {
  id: number;
  article: string;
  excerpt:string;
  title: string;
  image: string;
}
type Data= [SinglePost]


function Home() {
  // const { loading, error, data } = useFetch('http://localhost:1337/api/posts?populate=cover')

   const [page, setPage] = useState(1) 
   const pageSize:number = 6

  const { loading, error, data, pagination} = useFetchAllPosts(page, pageSize);
  
  function nextPage(){
    if(page < pagination.pageCount) setPage(page+1)
  }
  function prevPage(){
    if(page >1) setPage(page-1)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
<>  
<div className="post-grid">  
     {data.map((post:SinglePost) => (
          
        <div key={post.id} className="post-card">
          <h2>{post.title}</h2>
          <div className="cover-image-container">
          {/* <img className="cover-image" src={"http://localhost:1337" + post.image} alt="" /> */}
          <img className="cover-image" src={"https://strapi-119331-0.cloudclusters.net" + post.image} alt="" />
          </div>
          
          <ReactMarkdown>{post.excerpt}</ReactMarkdown>
          <Link to={`/post/${post.id}`}>Read more</Link>
        </div>
      ))}
</div>
<div className='pagination-container'>
  <button className="pagination-button" onClick={prevPage}>&#8249; Prev</button>
  <button className="pagination-button" onClick={nextPage}>Next &#8250;</button>
  </div>
</>    
  )
}

export default Home
