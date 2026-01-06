import React from "react";
import type { Employee } from "../components/EmployeeTable";
import StatusToggle from "../components/StatusToggle";


interface Props {
  emp: Employee;
  onEdit: (emp: Employee) => void;
  onDelete: (emp: Employee) => void;
  onToggleStatus: (id: string) => void;
  onPrint: (emp: Employee) => void;
}

const EmployeeRow: React.FC<Props> = ({
  emp,
  onEdit,
  onDelete,
  onToggleStatus,
  onPrint,
}) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3 text-sm">{emp.id}</td>

      <td className="px-4 py-3">
        <img
          src={emp.profileImage || "/avatar.png"}
          alt={emp.fullName}
          className="w-11 h-11 rounded-full border object-cover"
        />
      </td>

      <td className="px-4 py-3 font-medium">{emp.fullName}</td>

      <td className="px-4 py-3 text-sm">{emp.gender}</td>

      <td className="px-4 py-3 text-sm">
        {new Date(emp.dob).toLocaleDateString()}
      </td>

      <td className="px-4 py-3 text-sm">{emp.state}</td>

      <td className="px-4 py-3 text-center">
        <StatusToggle
          isActive={emp.isActive}
          onToggle={() => onToggleStatus(emp.id)}
        />
      </td>

      <td className="px-4 py-3">
        <div className="flex justify-center gap-3">
          <button
            onClick={() => onEdit(emp)}
            className="text-blue-600 hover:underline text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(emp)}
            className="text-red-600 hover:underline text-sm"
          >
            Delete
          </button>

          <button
            onClick={() => onPrint(emp)}
            className="text-emerald-600 hover:underline text-sm"
          >
            Print
          </button>
        </div>
      </td>
    </tr>
  );
};

export default React.memo(EmployeeRow);
