import {useQuery, gql} from '@apollo/client'

const POSTS = gql `
query GetPosts ($page:Int!, $pageSize:Int!) {
  posts(pagination: {page: $page, pageSize: $pageSize}) {
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
    meta{
      pagination{
          total
          pageCount
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

function useFetchAllPosts (page:number, pageSize:number) {


    let { loading, error, data} = useQuery(POSTS,  {
      variables: {page:page, pageSize:pageSize}});    
    let newDataArray:Array<ReformattedEntry> = [];
    let pagination;
    if(data){      
      pagination = data.posts.meta.pagination
     let newData = data.posts.data;
     newData.forEach((entry:Entry)=>{
         let formattedRow = {
             id: entry.id,
            title: entry.attributes.title,
            excerpt: entry.attributes.excerpt,
            image: entry.attributes.cover.data.attributes.url,
            article: entry.attributes.article
         }
         newDataArray.push(formattedRow)
     })
     console.log(newData)
     }
     
     
     data = newDataArray;
 
  return { loading, error, data, pagination }
}

export default useFetchAllPosts