import { isFunction } from "applocal";
import Post from ".";

export function Login({ data, success, error }) {
    Post({
        url: "login",
        data: { ...data, user_: "user_verified" },
        success: (res) => {
            if (isFunction(success)) success(res);
            // console.log(res);
        },
        error: (err) => {
            if (isFunction(error)) error(err);
            // console.log(:);
        },
    });
}
