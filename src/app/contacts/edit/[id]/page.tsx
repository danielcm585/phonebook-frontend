"use client"
import ContactForm from "@/components/ContactForm";
import fetchHttp from "@/utils/fetchHttp";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

export default function EditPage() {
    const {id} = useParams();

    const [contact, setContact] = useState<Contact>();
    const fetchData = async () => {
        const resp = await fetchHttp(`/contacts/${id}`, {method: 'GET'});
        setContact(resp.data);
    }
    useEffect(() => {
        fetchData();
    }, []);

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
                    Edit Contact
                </h1>
                {contact &&
                    <ContactForm 
                        isEdit 
                        contact={contact} />
                }
            </div>
        </div>
    )
}
