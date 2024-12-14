import React, { useState } from "react";
import Link from "next/link";
import { validateEmail } from "../utils/helpers";
import { putSubscriberIfAbsent } from "../utils/api";

function EmailSubscriptionForm() {
  const [subscribed, setSubscribed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleSubscribe = async () => {
    if (!subscribed && inputValue) {
      if (!validateEmail(inputValue)) {
        setIsValidEmail(false);
      } else {
        setIsValidEmail(true);
        await putSubscriberIfAbsent({ email: inputValue });
        setSubscribed(true);
      }
    }
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setSubscribed(false);
    setInputValue(e.target.value);
  };

  return (
    <div className="mt-8 md:mt-12 mb-8 md:mb-12 md:w-4/5 md:mx-auto w-full">
      <form className="flex rounded-full bg-slate-800 px-4 py-2 ring-1 ring-gray-400">
        <input
          type="email"
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          placeholder="Your email address:"
          className="w-full appearance-none bg-slate-800 focus:outline-none"
          onChange={handleInputChange}
          autoComplete="off"
          value={inputValue}
        />
        <button
          className="ml-2 shrink-0 rounded-full bg-gray-100 px-4 py-2 font-medium hover:bg-gray-200 duration-300"
          type="button"
          onClick={handleSubscribe}
        >
          {subscribed ? "Subscribed!" : "Subscribe"}
        </button>
      </form>
      <div className="mt-4 text-sm text-red-400">
        {isValidEmail ? "" : "Please enter a valid email address."}
      </div>
      <div className="mt-4 font-light text-gray-400 text-center">
        <Link href="/terms">Terms</Link> & <Link href="/privacy">Privacy</Link>
      </div>
    </div>
  );
}

export default EmailSubscriptionForm;
