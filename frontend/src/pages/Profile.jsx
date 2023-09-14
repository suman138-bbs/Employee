
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
const Profile = () => {
  const { eid } = useParams()
  const [detail, setDetail] = useState('')
  useEffect(()=> {
  async  function  getData () {
        const data = await  axios.get('http://localhost:8080/get/'+eid)
       setDetail(data.data.Result[0])
    }
    getData()
  }, [])
  console.log(detail)
  const {id,image} = detail
  return (
    <div>
      <h1><img src={`http://localhost:8080/images/`+image} alt="" className='empImg'/></h1>
      <h1></h1>
      <h1></h1>
      <h1></h1>
      <h1></h1>
      <h1></h1>
      <h1></h1>
      <h1></h1>
      <h1></h1>
      <h1></h1>
    </div>
  )
}

export default Profile