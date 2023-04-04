import { NavLink } from 'react-router-dom'
import useFetchCategoryList from '../hooks/useFetchCategoryList'

interface Category {
  id: number,
  name: string,
  description: string
}

function NavBar() {
  const {data, loading, error} = useFetchCategoryList()
  



  if(data)return (
    <nav> 
      <NavLink className={({isActive}) =>(isActive ? "link nav-link-active": "link")} to="/" end><h1>Travel Tales Blog</h1></NavLink>
      <div>
        <span>Categories: </span>
        { data.map((category:Category)=>(
          

        <NavLink key={category.id}className={({isActive}) =>(isActive ? "link nav-link-active": "link")} to={`/categories/${category.id}` }  >
          <span>{category.name}, </span>
        </NavLink>
        ))}


        {/* <NavLink className={({isActive}) =>(isActive ? "link nav-link-active": "link")} to="/" end><span>City Breaks </span></NavLink> */}
      </div>
    </nav>
  )
}

export default NavBar