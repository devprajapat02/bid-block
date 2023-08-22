import axios from 'axios'
import { toast } from 'react-toastify'

const post = async (uri, params, creds, notif) => {
    try {
        const res = await axios.post(uri, params, { withCredentials: creds })
        if (notif) {
            if (res.status == 200) toast.success(res.data.message)
            if (res.status == 201) toast.info(res.data.message)
        }
        console.log(res.data)
        return res
    } catch (err) {
        if (notif) toast.error(err.response.data.error)
        console.log(err)
        return err.response
    }
    
}

export default post