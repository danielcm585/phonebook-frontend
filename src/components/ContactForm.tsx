import fetchHttp from "@/utils/fetchHttp"
import randomColor from "@/utils/randomColor"
import { useFormik } from "formik"
import Avatar from "react-avatar"

export default function ContactForm({
    isEdit = false,
    contact,
}: {
    isEdit?: boolean;
    contact?: Contact;
}) {

    const formik = useFormik<Contact>({
        initialValues: {
            Name: contact?.Name || '',
            Phone: contact?.Phone || '',
        },
        onSubmit: async () => {
            if (isEdit) {
                await fetchHttp(`/contacts/${contact?.ID}`, {
                    method: 'PUT',
                    body: formik.values,
                });
                window.location.href = `/contacts/${contact?.ID}`;
            }
            else {
                await fetchHttp('/contacts', {
                    method: 'POST',
                    body: formik.values,
                });
                window.location.href = '/';
            }
        }
    })

    return (
        <form 
            onSubmit={formik.handleSubmit}
            className="mt-6">
            <div className="flex w-full justify-center">
                <Avatar 
                    name={formik.values.Name}
                    size="120"
                    round={true}
                    color={randomColor()} />
            </div>
            <p className="mt-4">
                Name
            </p>
            <input
                type="text"
                value={formik.values.Name}
                onChange={(e) => formik.setFieldValue('Name', e.target.value)}
                className="mt-2 w-full p-2 border-[0.5px] border-gray-400 rounded-md" />
            <p className="mt-4">
                Phone
            </p>
            <input
                type="text"
                value={formik.values.Phone}
                onChange={(e) => formik.setFieldValue('Phone', e.target.value)}
                className="mt-2 w-full p-2 border-[0.5px] border-gray-400 rounded-md" />
            <button 
                type="submit"
                className="mt-8 w-full py-2 bg-blue-500 text-white rounded-md">
                Save
            </button>
        </form>
    )
}
