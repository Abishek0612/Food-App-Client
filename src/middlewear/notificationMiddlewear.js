import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { clearToastNotifications } from "../redux/slice/restaurant/restaurantSlice"


const NotificationMiddlewear = () => {
const dispatch = useDispatch()

const successMsg = useSelector((state) => state?.restaurant?.success)


if (successMsg) {
    toast.success(successMsg, {
        onClose: () => dispatch(clearToastNotifications())
    });
}


return null;
}

export default NotificationMiddlewear
