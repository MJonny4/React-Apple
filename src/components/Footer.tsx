import { footerLinks } from "../constants";

export default function Footer() {
    return (
        <footer className="bg-black px-5 py-5 sm:px-10">
            <div className="screen-max-width">
                <div className="">
                    <p className="font-semibold text-gray text-xs">
                        More ways to shop: {' '}
                        <span className="text-blue underline">Find an Apple Store</span>
                        {' '} or {' '}
                        <span className="text-blue underline">other retailer</span>
                        {' '} near you.
                    </p>
                    <p className="font-semibold text-gray text-xs">
                        Or call +1 (863) 094-6124
                    </p>
                </div>

                <div
                    className="bg-neutral-700 my-5 h-[1px] w-full"
                />

                <div className="flex md:flex-row flex-col md:items-center justify-between">
                    <p className="font-semibold text-gray text-xs">
                        Copyright © 2024 Apple Inc. All rights reserved.
                    </p>
                    <div className="flex">
                        {
                            footerLinks.map((link, index) => (
                                <p
                                    className="font-semibold text-gray text-xs"
                                    key={link}
                                >
                                    {link}
                                    {
                                        index !== footerLinks.length - 1 && (
                                            <span className="mx-2">
                                                |
                                            </span>
                                        )
                                    }
                                </p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </footer>
    )
}
