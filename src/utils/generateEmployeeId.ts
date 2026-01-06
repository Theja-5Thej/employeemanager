import type { Employee } from "../components/EmployeeTable";

 export const generateEmployeeId = (employees: Employee[]) => {
  const existingIds = new Set(employees.map(emp => emp.id));

  let id = "";

  do {
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    id = `EMP${randomPart}`;
  } while (existingIds.has(id));

  return id;
};

