export default function Contact(props) {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-xl shadow-md p-5 m-4 flex items-center space-x-4 hover:shadow-lg transition-shadow">
            <img
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
                src={props.profile_picture}
                alt={props.name}
            />
            <div>
                <h3 className="text-lg font-bold text-gray-900">{props.name}</h3>
                <p className="text-sm text-gray-600"><span className="font-semibold">Email:</span> {props.email}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold">Phone:</span> {props.phone}</p>
            </div>
        </div>
    );
}
