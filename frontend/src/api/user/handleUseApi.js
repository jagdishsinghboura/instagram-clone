import axios from "axios"



async function handleUserApiGet({path, data, }) {
  try {
    const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/v1/user/${path}`);

    return data;
    
  } catch (error) {
    console.log(error)
  }

}

export default handleFollowUnfollow
