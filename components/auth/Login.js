"use client";

import bg from "@/public/auth_bg.svg";
import { toast } from 'react-hot-toast';
import { useFormStatus } from "react-dom";
import { authenticate } from "@/app/actions/user/action";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Submit() {
    const { pending } = useFormStatus();
    return (
        <button type="submit" className={pending ? "btn global-primary-btn managedDisabled" : "btn global-primary-btn"}> {
            pending ?
                `Please wait...`
                :
                `Login`
        }
        </button>
    )
}

const Login = () => {

    const { push } = useRouter();
    const [isShow, setIsShow] = useState(false);

    const handleForm = async (formData) => {
        try {
            const response = await authenticate(formData);

            if (response === undefined) {
                toast.success("Logged in successfully");
                push("/dashboard/analytics");
                return;
            } else if(response.status !== "201") {
                toast.error(response.message);
                return;
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="auth-section"
            style={{
                backgroundImage: `url(${bg.src})`,
                height: "100vh"
            }}
        >
            <div className="auth-inner-form">
                <h2>Login to panel</h2>
                <form action={handleForm}>
                    <div className="auth-form-group">
                        <i className="fa fa-user"></i>
                        <input
                            type="text"
                            placeholder="Please enter user name"
                            name="username"
                        />
                    </div>
                    <div className="auth-form-group">
                        <i className="fa fa-lock"></i>
                        <input
                            type={isShow ? "text" : "password"}
                            placeholder="Please enter password"
                            name="password"
                        />
                        <span className="password-input" onClick={() => setIsShow(!isShow)}>
                            {
                                isShow
                                    ?
                                    <i className="fa fa-eye"></i>
                                    :
                                    <i className="fa fa-eye-slash"></i>
                            }
                        </span>
                    </div>
                    <div className="auth-form-group">
                        <Submit />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login;