import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import Sidebar from "../../components/sidebar/Sidebar";
import { useGetUsersQuery, useUpdateUserRoleMutation } from "../../redux/features/api/endPoints/userEndpoint/userEndpoint";

export default function ManageUsers() {
    const { data, isLoading, isError } = useGetUsersQuery();
    const [updateUserRole, { isLoading: updateRoleIsLoading }] = useUpdateUserRoleMutation();

    const users = data?.data?.users;

    const handleUpdateRole = async (userId: string, newRole: string) => {
        try {
            await updateUserRole({ userId, role: newRole }).unwrap();
            toast.success(`${newRole === "Admin" ? "Promoted" : "Demoted"} user successfully!`);
        } catch (error) {
            toast.error("An error occurred while updating the user role.");
        }
    };

    let content;

    if (isLoading || updateRoleIsLoading) {
        content = <Loader />;
    } else if (isError) {
        content = <ErrorMessage message="Failed to load users. Please try again." />;
    } else if (!users || users.length === 0) {
        content = <ErrorMessage message="No users available." />;
    } else {
        content = (
            <div>
                <h2 className="text-xl text-center font-bold mb-4">All Users</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">User Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Role</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                            <tr key={user._id} className="hover:bg-gray-50 text-center">
                                <td className="border border-gray-300 p-2">{user.name}</td>
                                <td className="border border-gray-300 p-2">{user.email}</td>
                                <td className="border border-gray-300 p-2">{user.role}</td>
                                <td className="border border-gray-300 p-2 flex justify-center gap-2">
                                    <button
                                        onClick={() => handleUpdateRole(user._id, user.role === "Admin" ? "User" : "Admin")}
                                        className={`${user.role === "Admin" ? "bg-yellow-500" : "bg-blue-500"
                                            } text-white px-2 py-1 rounded hover:bg-opacity-80`}
                                        disabled={updateRoleIsLoading}
                                    >
                                        {user.role === "Admin" ? "Demote to User" : "Promote to Admin"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <>
            <Sidebar activeMenu="User Management" />
            <main className="w-[76%] p-4 mt-2 overflow-y-auto ml-[24%]">
                <div className="flex flex-col items-center mb-10">
                    <h1 className="text-center text-4xl font-bold mb-10">User Management</h1>
                    <div className="w-[100%] px-0 md:px-5 lg:px-10">{content}</div>
                </div>
            </main>
        </>
    );
}
