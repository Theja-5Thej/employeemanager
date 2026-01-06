import React from "react";
import EmployeeRow from "../reusableComponents/EmployeeRow";

export type Employee = {
    id: string;
    profileImage?: string;
    fullName: string;
    gender: "Male" | "Female" | "Other";
    dob: string;
    state: string;
    isActive: boolean;
};

type Props = {
    employees: Employee[];
    onEdit: (emp: Employee) => void;
    onDelete: (emp: Employee) => void;
    onToggleStatus: (id: string) => void;
    onPrint: (emp: Employee) => void;
};

const EmployeeTable: React.FC<Props> = ({
    employees,
    onEdit,
    onDelete,
    onToggleStatus,
    onPrint,
}) => {



    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow mt-5">
            <table className="w-full border-collapse">
                <thead className="bg-gray-100 text-sm text-gray-700">
                    <tr>
                        <th className="px-4 py-6 text-left">Employee ID</th>
                        <th className="px-4 py-6 text-left">Profile</th>
                        <th className="px-4 py-6 text-left">Full Name</th>
                        <th className="px-4 py-6 text-left">Gender</th>
                        <th className="px-4 py-6 text-left">DOB</th>
                        <th className="px-4 py-6 text-left">State</th>
                        <th className="px-4 py-6 text-center">Status</th>
                        <th className="px-4 py-6 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y">
                    {employees.length === 0 ? <tr>
                        <td
                            colSpan={8}
                            className="text-center py-6 text-gray-500"
                        >
                            No employees found
                        </td>
                    </tr> : employees.map((emp) => (
                        <EmployeeRow
                            key={emp.id}
                            emp={emp}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onToggleStatus={onToggleStatus}
                            onPrint={onPrint}
                        />
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default React.memo(EmployeeTable);
