import React, { useState, useEffect } from "react";
import Link from "next/link";
import { validateEmail } from "../utils/helpers";
import { putSubscriberIfAbsent } from "../utils/api";

function EmailSubscriptionForm({
  initialPlaceholder = "To receive future updates in your inbox, enter your email",
  mobilePlaceholder = "Enter your email to receive future updates",
  columnWidth = 4,
}) {
  const [subscribed, setSubscribed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [placeholder, setPlaceholder] = useState(initialPlaceholder);
  const [isMobile, setIsMobile] = useState(false);

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
      setIsMobile(window.innerWidth < 450);
      setPlaceholder(isMobile ? mobilePlaceholder : initialPlaceholder);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile, initialPlaceholder, mobilePlaceholder]);

  const handleInputChange = (e) => {
    setSubscribed(false);
    setInputValue(e.target.value);
  };

  return (
    <div className="mt-8 md:mt-12 mb-8 md:mb-12 grid gap-8 justify-items-center">
      <div
        className={`grid grid-cols-3 md:grid-cols-${columnWidth} gap-2 items-center w-full`}
      >
        <input
          id="post-reply"
          className={`md:col-span-${columnWidth - 1} col-span-3 font-light text-base md:text-sm focus:outline-none resize-none p-2.5 w-full border-b border-white focus:border-gray-600 placeholder-gray-400`}
          placeholder={placeholder}
          onChange={handleInputChange}
          autoComplete="off"
          value={inputValue}
        />
        {isMobile && <div />}
        <button
          type="button"
          className="col-span-1 bg-gray-100 font-light text-base md:text-sm hover:bg-gray-200 hover:text-gray-500 text-gray-400 px-4 py-3 duration-300 rounded-full"
          onClick={handleSubscribe}
        >
          {subscribed ? "Subscribed!" : "Subscribe"}
        </button>
      </div>
      <div className="text-sm text-red-400">
        {isValidEmail ? "" : "Please enter a valid email"}
      </div>
      <div className="md:text-xs font-light text-gray-400 text-center">
        <Link href="/terms">Terms</Link> & <Link href="/privacy">Privacy</Link>
      </div>
    </div>
  );
}

export default EmailSubscriptionForm;
