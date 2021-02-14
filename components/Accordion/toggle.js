import Downward from "../Icon/downward";
import Upward from "../Icon/upward";

const Toggle = ({dropped, ...rest}) => {
    return (
        <span{...rest}>
      {dropped ? (<Downward/>) : (<Upward/>)}
    </span>
    );
}

export default Toggle