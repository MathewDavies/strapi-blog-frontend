import {useQuery, gql} from '@apollo/client'

const POSTS = gql `

query GetPostsByCategory($id:ID!){
    category(id: $id) {
      data {
        id
        attributes {
          name
          description
          posts {
            data {
              id
              attributes {
                author {
                  data {
                    attributes {
                      author
                    }
                  }
                }
                title
                excerpt
                article
                cover {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

`

type Entry = {
  id: number,
  attributes: {
    title: string,
    excerpt:string,
    cover: {
      data: {
        attributes: {
          url:string
        }
      }
    }
    article:string, 
  }
}

type ReformattedEntry={
id: number,
title: string,
excerpt: string,
image: string, 
article:string
}
type CategoryData = {
  name: string;
  description: string;
}

function useFetchCategoryPosts (id:number) {
  let { loading, error, data} = useQuery(POSTS, {
    variables: {id:id}
})
  
    let newDataArray:Array<ReformattedEntry> = [];
    let categoryData:CategoryData
    if(data){      
        console.log(data)   
      let newData = data.category.data.attributes;
      categoryData = {
        name: newData.name,
        description: newData.description
      }
      console.log(categoryData)
      
      
      newData.posts.data.forEach((entry:Entry)=>{
         let formattedRow = {
             id: entry.id,
            title: entry.attributes.title,
            excerpt: entry.attributes.excerpt,
            image: entry.attributes.cover.data.attributes.url,
            article: entry.attributes.article
         }
         newDataArray.push(formattedRow)
     })
     
  }
     data = newDataArray;
 
  return { loading, error, data, categoryData }
}

export default useFetchCategoryPosts