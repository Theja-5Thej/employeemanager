import * as XLSX from "xlsx";
import type { Employee } from "../components/EmployeeTable";

export const exportEmployeesToExcel = (employees: Employee[]) => {
  const formattedData = employees.map(emp => ({
    "Employee ID": emp.id,
    "Full Name": emp.fullName,
    Gender: emp.gender,
    "Date of Birth": emp.dob,
    State: emp.state,
    Status: emp.isActive ? "Active" : "Inactive",
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

  XLSX.writeFile(workbook, "Employees_List.xlsx");
};
