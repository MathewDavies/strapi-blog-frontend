import {useQuery, gql} from '@apollo/client'

type Entry= {   
      id: number,
      attributes: {
        name: string,
         description:string
      }
}
type ReformattedEntry= {   
      id: number,
      name: string,
      description:string
}
const CATEGORYLIST = gql `
query GetCategories{
  categories {
    data {
      id
      attributes {
        name,
         description
      }
    }
  }  
}
`
function useFetchCategoryList () {
    let { loading, error, data} = useQuery(CATEGORYLIST);    
     let newDataArray:Array<ReformattedEntry> = [];
    if(data){    
      let newData = data.categories.data;
      newData.forEach((entry:Entry)=>{
          let formattedRow = {
              id: entry.id,
             name: entry.attributes.name,
             description: entry.attributes.description,
          }
          newDataArray.push(formattedRow)
      })
    //  console.log(newDataArray)
    
    }
     
      data = newDataArray;
    // console.log(data)
  return { loading, error, data }
}

export default useFetchCategoryList