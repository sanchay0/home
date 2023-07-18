import Link from 'next/link';

export default function Terms() {
    return (  
        <div className="mt-10">
        <h1>
            <div className="font-semibold mt-2">Terms of Use</div>
        </h1>
        <div className="mt-2">
            Please read these terms of use (&quot;terms of use&quot;, &quot;agreement&quot;) carefully before using [website]
            website (“website”, &quot;service&quot;) operated by Sanchay Javeria (&quot;us&quot;, &apos;we&quot;, &quot;our&quot;).
        </div>
        <div className="font-semibold mt-2">Conditions of use</div>
        <div className="mt-2">
            By using this website, you certify that you have read and reviewed this Agreement and that you
            agree to comply with its terms. If you do not want to be bound by the terms of this Agreement,
            you are advised to leave the website accordingly. Sanchay Javeria only grants use and access of this
            website, its products, and its services to those who have accepted its terms.
        </div>
        <div className="font-semibold mt-2">Privacy policy</div>
        <div className="mt-2">
            Before you continue using our website, we advise you to read our <span className="underline">
                <Link href="/privacy">
                privacy policy</Link>
            </span> regarding our user data collection. It will help you better understand our practices.
        </div>
        <div className="font-semibold mt-2">Age restriction</div>
        <div className="mt-2">
            You must be at least 18 (eighteen) years of age before you can use this website. By using this
            website, you warrant that you are at least 18 years of age and you may legally adhere to this
            Agreement. Sanchay Javeria assumes no responsibility for liabilities related to age misrepresentation.
        </div>
        <div className="font-semibold mt-2">Intellectual property</div>
        <div className="mt-2">
            You agree that all materials, products, and services provided on this website are the property of
            Sanchay Javeria, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all
            copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree
            that you will not reproduce or redistribute the Sanchay Javeria&apos;s intellectual property in any way,
            including electronic, digital, or new trademark registrations.
            You grant Sanchay Javeria a royalty-free and non-exclusive license to display, use, copy, transmit, and
            broadcast the content you upload and publish. For issues regarding intellectual property claims,
            you should contact the company in order to come to an agreement.
        </div>
        <div className="font-semibold mt-2">User accounts</div>
        <div className="mt-2">
            As a user of this website, you may be asked to register with us and provide private information.
            You are responsible for ensuring the accuracy of this information, and you are responsible for
            maintaining the safety and security of your identifying information. You are also responsible for
            all activities that occur under your account or password.
            If you think there are any possible issues regarding the security of your account on the website,
            inform us immediately so we may address it accordingly.
            We reserve all rights to terminate accounts, edit or remove content and cancel orders in their
            sole discretion.
        </div>
        <div className="font-semibold mt-2">Applicable law</div>
        <div className="mt-2">
            By visiting this website, you agree that the laws of the [location], without regard to principles of
            conflict laws, will govern these terms and conditions, or any dispute of any sort that might come
            between Sanchay Javeria and you, or its business partners and associates.
        </div>
        <div className="font-semibold mt-2">Disputes</div>
        <div className="mt-2">
            Any dispute related in any way to your visit to this website or to products you purchase from us
            shall be arbitrated by state or federal court [location] and you consent to exclusive jurisdiction
            and venue of such courts.
        </div>
        <div className="font-semibold mt-2">Indemnification</div>
        <div className="mt-2">
            You agree to indemnify Sanchay Javeria and its affiliates and hold Sanchay Javeria harmless against legal claims
            and demands that may arise from your use or misuse of our services. We reserve the right to
            select our own legal counsel.
        </div>
        <div className="font-semibold mt-2">Limitation on liability</div>
        <div className="mt-2">
            Sanchay Javeria is not liable for any damages that may occur to you as a result of your misuse of our
            website.
        </div>
        Sanchay Javeria reserves the right to edit, modify, and change this Agreement any time. We shall let our
        users know of these changes through electronic mail. This Agreement is an understanding
        between Sanchay Javeria and the user, and this supersedes and replaces all prior agreements regarding
        the use of this website.
        </div>
    )
}