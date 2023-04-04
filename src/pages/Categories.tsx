import { useParams } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Link } from 'react-router-dom';
import useFetchCategoryPosts from '../hooks/useFetchCategoryPosts';


interface SinglePost {
  id: number;
  article: string;
  excerpt:string;
  title: string;
  image: string;
}
type Data= [SinglePost]


function Categories() {
  const {id} = useParams();
  const { loading, error, data, categoryData} = useFetchCategoryPosts(id);
  if(data)console.log(categoryData)


  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  if(data) return (
  <>  
    <h2 className="category-title">{categoryData.name}</h2>
    <h3 className='category-description'>{categoryData.description}</h3>
    
<div className="post-grid">  

     {data.map((post:SinglePost) => (
          
        <div key={post.id} className="post-card">
          <h2>{post.title}</h2>
          <div className="cover-image-container">
          <img className="cover-image" src={"http://localhost:1337" + post.image} alt="" />
          </div>
          
          <ReactMarkdown>{post.excerpt}</ReactMarkdown>
          <Link to={`/post/${post.id}`}>Read more</Link>
        </div>
      ))}
</div>
</>
  )
}

export default Categories
