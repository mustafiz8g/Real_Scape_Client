
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const { loginUser, forgetPassword } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [successSMS, setSuccessSMS] = useState('');
    const [error, setError] = useState('');



    const emailRef = useRef();

    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state || '/';
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;



        setSuccessSMS('')
        setError('')
        if (password.length < 6) {
            setError('password should be 6 cahharacters or longer')
            return;
        }
        const passwordRegexU = /^(?=.*[A-Z]).+$/
        const passwordRegexL = /^(?=.*[a-z]).+$/
    
        if (!passwordRegexU.test(password)) {
            setError('At least one Caracter Uppercase')
            return;
        }
        if (!passwordRegexL.test(password)) {
            setError('At least one Caracter Lowercase')
            return;
        }

        loginUser(email, password)
            .then(result => {
                // console.log('sign IN :', result.user.email)
                if (result.user) {
                    Swal.fire({
                        title: "Login Successful",
                        icon: "success"
                    });
                }


           


                navigate(from)

            })
            .catch(err => {
                // console.log(err.message)
                setError(err.message)
            })

    }

    const handleForgetPassword = () => {

        const email = emailRef.current.value;
        if (!email) {
            toast('Please Provide a valid email')
            return;
        }
        else {
            forgetPassword(email)
                .then(() => {
                    toast('Password Reset Email Sent, Please check you email')
                })


        }

    }


    const handlePassword = ev => {
        ev.preventDefault();
        const newPassword = ev.target.value;
        setError('')
        setSuccessSMS('')
        //password validation 

        if (newPassword.length <= 6) {
            setError('password should be 6 cahharacters or longer')

        }
        const passwordRegexU = /^(?=.*[A-Z]).+$/
        const passwordRegexL = /^(?=.*[a-z]).+$/
        if (!passwordRegexU.test(newPassword)) {
            setError('At least one Caracter Uppercase')

        }
        if (!passwordRegexL.test(newPassword)) {
            setError('At least one Caracter Lowercase')

        }
        if (newPassword.length > 6 && passwordRegexU.test(newPassword) && passwordRegexL.test(newPassword)) {
            setSuccessSMS('strong')
        }


    }


    return (
        <div className="w-10/12 min-h-[500px] mx-auto flex flex-col-reverse md:flex-row justify-center items-center">

            <div>
            <form onSubmit={handleLogin} className="w-[340px]">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Email</span>
                    </label>
                    <input
                        name="email"
                        type="email"
                        ref={emailRef}
                        placeholder="email"
                        className="input input-bordered"
                        required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Password</span>
                    </label>
                    <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={handlePassword}

                        placeholder="password"
                        className="input input-bordered"
                        required
                    // autoComplete="current-password"

                    />
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="relative w-6 left-[300px] bottom-8">
                        {
                            showPassword ? <MdRemoveRedEye /> : <FaEyeSlash />
                        }
                    </div>
                    <div className="form-control ">
                        <p className="text-sm text-success">{successSMS}</p>
                        <p className="text-sm text-error">{error}</p>

                    </div>
                    <label onClick={handleForgetPassword} className="label">
                        <a className="label-text-alt link link-hover">Forgot password?</a>
                    </label>

                </div>

                <div className="form-control mt-4">
                    <button className="btn btn-primary  text-[16px]">Login</button>
                </div>

                <div>
                    <p className="text-[14px] mt-3">dont have Account ? <Link to="/signup"><button className="link link-info font-bold">Register</button>
                    </Link></p>
                </div>
                <div className="divider"><small>OR</small></div>

                


            </form>
      
            </div>


         
        </div>
    );
};

export default Login;     