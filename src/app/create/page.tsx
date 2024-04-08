"use client"
import ContactForm from "@/components/ContactForm";
import { FaChevronLeft } from "react-icons/fa";

export default function CreatePage() {
    return (
        <div className="flex justify-center bg-gray-100">
            <div className="min-h-screen w-[min(520px,100vw)] bg-white pt-4 pb-28 px-4">
                <div className="flex w-full justify-between items-center">
                    <button 
                        onClick={() => window.location.href='/'}
                        className="flex gap-2 items-center text-gray-500">
                        <FaChevronLeft />
                        <p>Contacts</p>
                    </button>
                </div>
                <h1 className="mt-6 text-3xl font-extrabold">
                    New Contact
                </h1>
                <ContactForm />
            </div>
        </div>
    )
}
