import { useEffect, useState } from "react"
interface Data{
    data:[] |{};
    meta:{}
}
const useFetch = (url:string) => {
  const [data, setData] = useState<null | Data>(null)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      try {
        const res = await fetch(url)
        const json = await res.json()

        setData(json);
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchData();
  }, [url])

  return { loading, error, data }
}

export default useFetch