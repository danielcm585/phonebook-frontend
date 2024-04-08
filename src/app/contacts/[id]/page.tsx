"use client";
import { cn } from "@/utils/cn";
import fetchHttp from "@/utils/fetchHttp";
import randomColor from "@/utils/randomColor";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";

export default function ContactDetailsPage() {
    const {id} = useParams();

    const [contact, setContact] = useState<Contact>();
    const fetchData = async () => {
        const resp = await fetchHttp(`/contacts/${id}`, {method: 'GET'});
        setContact(resp.data);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const [isOptionOpen, setIsOptionOpen] = useState(false);

    const deleteContact = async () => {
        await fetchHttp(`/contacts/${id}`, {method: 'DELETE'});
        window.location.href = '/';
    }

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
                    <div className="relative">
                        <button 
                            onClick={() => setIsOptionOpen((prev) => !prev)}
                            className="text-gray-500">
                            <BsThreeDotsVertical className="text-xl" />
                        </button>
                        <div className={cn(
                            !isOptionOpen && "hidden",
                            "absolute mt-2 w-[100px] right-0 bg-white border-[0.5px] border-gray-400 rounded-md"
                        )}>
                            <button 
                                onClick={() => window.location.href=`/contacts/edit/${id}`}
                                className="py-2 px-2 w-full text-start">
                                Edit
                            </button>
                            <div className="w-full h-[0.5px] bg-gray-400"></div>
                            <button 
                                onClick={deleteContact}
                                className="py-2 px-2 w-full text-start text-red-500">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <div>
                        <div className="flex w-full justify-center">
                            <Avatar 
                                name={contact?.Name}
                                size="120"
                                round={true}
                                color={randomColor()} />
                        </div>
                        <p className="mt-4 font-bold text-center text-2xl">
                            {contact?.Name}
                        </p>
                        <p className="text-xl text-gray-500 text-center">
                            {contact?.Phone}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
