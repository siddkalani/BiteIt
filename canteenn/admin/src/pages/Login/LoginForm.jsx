// import { useRef, useEffect, useState } from "react";
// import AuthButton from "../Shared/AuthButton";
// import AuthFooter from "../Shared/AuthFooter";
// import AuthInput from "../Shared/AuthInput";
// import AuthPassInput from "../Shared/AuthPassInput";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../store/Slices/userDetailSlice";
// import { useNavigate } from "react-router-dom";
// import FailureAlert from "../Shared/FailureAlert";
// import SuccessAlert from "../Shared/SuccessAlert";

// export default function LoginForm() {
//   const { loginStatus } = useSelector((state) => state.users);
//   const dispatch = useDispatch();

//   const emailRef = useRef("");
//   const passRef = useRef("");

//   const [alert, setAlert] = useState("");

//   const navigate = useNavigate();

//   const handleOnSubmit = async (e) => {
//     e.preventDefault();
//     const email = emailRef.current.value;
//     const password = passRef.current.value;
//     setAlert("");

//     try {
//       await dispatch(loginUser({ email, password })).unwrap();
//       setAlert({ type: "success" });
//       emailRef.current.value = "";
//     } catch (error) {
//       console.error("Error:", error);
//       setAlert({
//         type: "failure",
//         message: error || "Please check your information and try again.",
//       });
//     }
//   };

//   useEffect(() => {
//     if (loginStatus == "succeeded") {
//       navigate("/home");
//     }
//   }, [loginStatus, navigate]);

//   return (
//     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//       <form className="space-y-6" onSubmit={handleOnSubmit}>
//         <AuthInput label={"Email"} type={"email"} inputRef={emailRef} />

//         <AuthPassInput label={"Password"} forgotPass={true} passRef={passRef} />

//         <AuthButton text={"Sign In"} />
//       </form>

//       <AuthFooter
//         mainText={" Not Registered?"}
//         text={" REGISTER HERE"}
//         link={"/register"}
//       />
//       <div className="mt-10">
//         {alert.type === "success" ? (
//           <SuccessAlert
//             label1={"Registration successful"}
//             label2={"Please check your email to verify"}
//           />
//         ) : alert.type === "failure" ? (
//           <FailureAlert
//             label1={"Registration Failed!"}
//             label2={alert.message}
//           />
//         ) : null}
//       </div>
//     </div>
//   );
// }




import { useRef, useState } from "react";
import AuthButton from "../Shared/AuthButton";
import AuthFooter from "../Shared/AuthFooter";
import AuthInput from "../Shared/AuthInput";
import { useNavigate } from "react-router-dom";
import FailureAlert from "../Shared/FailureAlert";
import SuccessAlert from "../Shared/SuccessAlert";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/Slices/userDetailSlice"; 

export default function PhoneLoginForm() {
  const phoneRef = useRef("");
  const [alert, setAlert] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const phone = phoneRef.current.value;
    setAlert("");

    try {
      // Dispatch the OTP request
      await dispatch(loginUser({ phone })).unwrap();
      setAlert({ type: "success" });
      phoneRef.current.value = "";

      // Navigate to the OTP page and pass phone as a param
      navigate(`/otp?phone=${encodeURIComponent(phone)}`);
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        type: "failure",
        message: error || "Failed to request OTP. Please try again.",
      });
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleOnSubmit}>
        <AuthInput label={"Phone"} type={"text"} inputRef={phoneRef} />

        <AuthButton text={"Login with Phone"} />
      </form>

      <AuthFooter
        mainText={"Not Registered?"}
        text={"REGISTER HERE"}
        link={"/register"}
      />

      <div className="mt-10">
        {alert.type === "success" ? (
          <SuccessAlert
            label1={"OTP sent successfully"}
            label2={"Please check your phone for the OTP"}
          />
        ) : alert.type === "failure" ? (
          <FailureAlert label1={"Failed!"} label2={alert.message} />
        ) : null}
      </div>
    </div>
  );
}
