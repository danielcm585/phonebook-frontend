"use client"
import fetchHttp from "@/utils/fetchHttp";
import randomColor from "@/utils/randomColor";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

export default function HomePage() {
    const [data, setData] = useState<Contact[]>([]);
    const fetchData = async () => {
        const resp = await fetchHttp('/contacts', {method: 'GET'});
        setData(resp.data);
        setFilteredContact(resp.data);
        setKeyword('');
    }
    useEffect(() => {
        fetchData();
    }, []);

    const [filteredContact, setFilteredContact] = useState(data);
    const [keyword, setKeyword] = useState('');
    useEffect(() => {
        setFilteredContact(data.filter((contact) => 
            contact.Name.toLowerCase().includes(keyword.toLowerCase()) ||
            contact.Phone.includes(keyword)
        ))
    }, [keyword]);
    
    return (
        <div className="flex justify-center bg-gray-100">
            <div className="min-h-screen w-[min(520px,100vw)] bg-white pt-4 pb-28 px-4">
                <div className="flex w-full justify-end">
                    <button onClick={() => window.location.href='/create'}>
                        <AiOutlinePlus className="text-4xl font-extralight" />
                    </button>
                </div>
                <h1 className="mt-2 text-3xl font-extrabold">
                    My Contacts
                </h1>
                <h2 className="mt-1 text-gray-400">
                    {data.length} Contacts
                </h2>
                <div className="sticky top-5">
                    <div className="relative mt-6">
                        <FaSearch className="absolute mt-5 ml-6 text-[#9BA3AF]" />
                        <input 
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Search by Name or number"
                            className="w-full py-4 px-14 bg-gray-100 rounded-full" />
                    </div>
                </div>
                <div className="mt-2">
                    {filteredContact.map((contact, index) => (
                        <div>
                            {index !== 0 && 
                                <div className="w-full h-[1px] bg-gray-300"></div>
                            }
                            <div 
                                onClick={() => window.location.href=`/contacts/${contact.ID}`}
                                className="flex gap-4 items-center w-full px-2 py-4 hover:bg-gray-50">
                                <Avatar 
                                    name={contact.Name}
                                    size="50"
                                    round={true}
                                    color={randomColor()} />
                                <div>
                                    <p className="font-bold">
                                        {contact.Name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {contact.Phone}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
