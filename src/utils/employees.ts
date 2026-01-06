import {type Employee } from "../components/EmployeeTable";

export const employeesData: Employee[] = [
  {
    id: "EMP001",
    profileImage: "https://i.pravatar.cc/150?img=1",
    fullName: "Rahul Sharma",
    gender: "Male",
    dob: "1992-04-15",
    state: "Karnataka",
    isActive: true,
  },
  {
    id: "EMP002",
    profileImage: "https://i.pravatar.cc/150?img=2",
    fullName: "Ananya Verma",
    gender: "Female",
    dob: "1995-08-22",
    state: "Maharashtra",
    isActive: true,
  },
  {
    id: "EMP003",
    profileImage: "https://i.pravatar.cc/150?img=3",
    fullName: "Vikram Reddy",
    gender: "Male",
    dob: "1990-12-05",
    state: "Telangana",
    isActive: false,
  },
  {
    id: "EMP004",
    profileImage: "https://i.pravatar.cc/150?img=4",
    fullName: "Sneha Iyer",
    gender: "Female",
    dob: "1993-06-18",
    state: "Tamil Nadu",
    isActive: true,
  },
  {
    id: "EMP005",
    profileImage: "https://i.pravatar.cc/150?img=5",
    fullName: "Arjun Patel",
    gender: "Male",
    dob: "1988-02-10",
    state: "Gujarat",
    isActive: false,
  },
];

const STORAGE_KEY = "employees";

export const getEmployeesFromStorage = (): Employee[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveEmployeesToStorage = (employees: Employee[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
};

