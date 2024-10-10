/* eslint-disable react/prop-types */
import AuthHeader from "./AuthHeader";

export default function AuthLogo({header}) {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <AuthHeader header={header} />
    </div>
  );
}
