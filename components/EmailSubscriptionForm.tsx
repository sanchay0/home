import React, { useState, useEffect } from "react";
import Link from "next/link";
import { validateEmail } from "../utils/helpers";
import { putSubscriberIfAbsent } from "../utils/api";

function EmailSubscriptionForm({
  initialPlaceholder = "To receive future updates in your inbox, enter your email",
  mobilePlaceholder = "Enter your email to receive future updates",
}) {
  const [subscribed, setSubscribed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [placeholder, setPlaceholder] = useState(initialPlaceholder);

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

  useEffect(() => {
    const handleResize = () => {
      setPlaceholder(
        window.innerWidth < 450 ? mobilePlaceholder : initialPlaceholder,
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initialPlaceholder, mobilePlaceholder]);

  const handleInputChange = (e) => {
    setSubscribed(false);
    setInputValue(e.target.value);
  };

  return (
    <>
      <div className="text-sm mt-8 md:mt-12 mb-8 md:mb-12">
        <div className="grid grid-cols-3 gap-2">
          <input
            id="post-reply"
            className="col-span-3 md:col-span-2 font-light focus:outline-none resize-none w-full border-b border-white focus:border-gray-600 placeholder-gray-400"
            placeholder={placeholder}
            onChange={handleInputChange}
            autoComplete="off"
            value={inputValue}
          />
          <button
            type="button"
            className="w-3/5 col-span-1 md:col-span-1 col-start-2 md:col-start-auto bg-gray-100 font-light hover:bg-gray-200 hover:text-gray-500 text-gray-400 py-3 duration-300 rounded-full"
            onClick={handleSubscribe}
          >
            {subscribed ? "Subscribed!" : "Subscribe"}
          </button>
        </div>
        <div className="text-sm text-red-400">
          {isValidEmail ? "" : "Please enter a valid email"}
        </div>
      </div>
      <div>
        <div className="md:text-xs font-light text-gray-400 text-center">
          <Link href="/terms">Terms</Link> &{" "}
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </>
  );
}

export default EmailSubscriptionForm;
