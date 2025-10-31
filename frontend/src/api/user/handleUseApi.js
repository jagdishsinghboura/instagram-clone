import axios from "axios"



async function handleUserApiGet({path, data, }) {
  try {
    const {data} = await axios.get(`http://localhost:8000/api/v1/user/${path}`);

    return data;
    
  } catch (error) {
    console.log(error)
  }

}

export default handleFollowUnfollow