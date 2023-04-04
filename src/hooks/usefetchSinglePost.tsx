import {useQuery, gql} from '@apollo/client'


const POST = gql`
query GetPost($id:ID!) {
  post(id:$id) {
    data {
      id
      attributes {
        title
        excerpt
        cover {
          data {
            attributes {
              url
            }    
          }
        }
        article
      }
    }
  }
}
` 
function useFetchSinglePost (id:number) {
  
    let { loading, error, data} = useQuery(POST, {
        variables: {id:id}
    })
    if(data) console.log(data)
    if(data){
    let newData = {
         id: data.post.data.id,
         title: data.post.data.attributes.title,
         excerpt:data.post.data.attributes.excerpt,
         image: data.post.data.attributes.cover.data.attributes.url,
         article: data.post.data.attributes.article
    }

    data = newData;
    console.log(newData)
  }
    
  
  return { loading, error, data }
}


export default useFetchSinglePost