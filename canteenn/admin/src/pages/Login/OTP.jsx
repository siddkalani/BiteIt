import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthButton from "../Shared/AuthButton";
import AuthInput from "../Shared/AuthInput";
import FailureAlert from "../Shared/FailureAlert";
import SuccessAlert from "../Shared/SuccessAlert";
import axios from "axios";

export default function OtpVerificationForm() {
    const otpRef = useRef("");
    const [alert, setAlert] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Extract phone from query params
    const queryParams = new URLSearchParams(location.search);
    const phone = queryParams.get("phone");

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const otp = otpRef.current.value;
        setAlert("");

        try {
            // Make the POST request to verify OTP
            const response = await axios.post("http://localhost:3000/user/verify/phone/otp", {
                phone,
                otp,
            });

            if (response.data.message === "Admin phone verified successfully!") {
                // Save admin ID and token in localStorage or sessionStorage
                localStorage.setItem("adminId", response.data.adminId);
                localStorage.setItem("adminToken", response.data.token);

                // Set success alert and navigate to home page
                setAlert({ type: "success" });
                navigate("/");
            } else {
                // Handle other messages (like user OTP verification)
                setAlert({ type: "failure", message: response.data.message });
            }
        } catch (error) {
            console.error("Error:", error);
            setAlert({
                type: "failure",
                message: error.response?.data?.message || "Invalid OTP. Please try again.",
            });
        }
    };

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleOnSubmit}>
                <AuthInput label={"Enter OTP"} type={"text"} inputRef={otpRef} />

                <AuthButton text={"Verify OTP"} />
            </form>

            <div className="mt-10">
                {alert.type === "success" ? (
                    <SuccessAlert label1={"OTP Verified"} label2={"You are logged in"} />
                ) : alert.type === "failure" ? (
                    <FailureAlert label1={"Verification Failed!"} label2={alert.message} />
                ) : null}
            </div>
        </div>
    );
}
