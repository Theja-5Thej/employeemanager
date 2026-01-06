import { useEffect, useMemo, useState } from "react"
import EmployeeTable, { type Employee } from "../components/EmployeeTable"
import {  getEmployeesFromStorage, saveEmployeesToStorage } from "../utils/employees";
import PrintModal from "../components/PrintModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import EmployeeFormModal, { type EmployeeForm } from "../components/EmployeeFormModal";
import { generateEmployeeId } from '../utils/generateEmployeeId';
import { exportEmployeesToExcel } from "../utils/exportEmployeesToExcel";
type ModalType = "add-edit" | "delete" | "print" | null;

const Dashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>(() =>
    getEmployeesFromStorage().length
      ? getEmployeesFromStorage()
      : [] // fallback mock data
  );
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState<"all" | "Male" | "Female">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch =
        emp.fullName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGender =
        genderFilter === "all" || emp.gender === genderFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && emp.isActive) ||
        (statusFilter === "inactive" && !emp.isActive);

      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [employees, searchTerm, genderFilter, statusFilter]);
  useEffect(() => {
    saveEmployeesToStorage(employees);
  }, [employees]);

  const handleDelete = (id: string | undefined) => {
    if (!id) return
    setEmployees(prev =>
      prev.filter(emp => emp.id !== id)
    )
    setSelectedEmployee(null);
    setActiveModal(null)
  }
  const handleToggle = (id: string) => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === id
          ? { ...emp, isActive: !emp.isActive }
          : emp
      )
    );
  }
  const handleClickPrint = (emp: Employee) => {
    setSelectedEmployee(emp);
    setActiveModal("print");
  }
  const handleDeleteClick = (emp: Employee) => {
    setSelectedEmployee(emp);
    setActiveModal("delete");

  };
  const handleClickEditButton = (emp: Employee) => {
    setSelectedEmployee(emp);
    setActiveModal("add-edit");

  }
  const handleSaveEmployee = (data: EmployeeForm) => {
    if (data.id) {
      // EDIT
      setEmployees(prev =>
        prev.map(emp =>
          emp.id === data.id ? { ...emp, ...data } : emp
        )
      );
    } else {
      // ADD
      setEmployees(prev => [
        ...prev,
        { ...data, id: generateEmployeeId(prev) }
      ]);
    }
  };

  const handleAddEmployee = () => {
    setActiveModal('add-edit');
    setSelectedEmployee(null)
  };
  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedEmployee(null)
  }

  return (
    <div className='flex mt-20! text-gray-700  scroll-container    bg-linear-to-br from-indigo-300 via-white to-blue-300 px-4'>
      <div className="py-5  w-full">
        <div className="flex px-10 align-middle justify-between">
          <h2 className="text-2xl font-bold">Dashboard Summary {employees.length >0 && <span>({employees.length})</span>} </h2>
          <button onClick={handleAddEmployee} className="bg-violet-800! text-white">
            + Add Employee
          </button>
        </div>
        <div className="flex items-end px-10 justify-between mt-5">
          <div className="flex align-middle gap-4 ">
            <div>
              <h5>Gender</h5>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value as any)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="all">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <h5>Status</h5>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex align-baseline gap-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-lg w-full h-10 md:w-64"
            />
            <button onClick={() => exportEmployeesToExcel(filteredEmployees)} className="bg-emerald-700 text-white  h-10!">
              Download
            </button>
          </div>

        </div>
        <div className="w-full px-10 mt-5 max-h-[65vh] overflow-y-auto" id="print-employees">
          <EmployeeTable
            employees={filteredEmployees}
            onEdit={handleClickEditButton}
            onDelete={handleDeleteClick}
            onToggleStatus={handleToggle}
            onPrint={handleClickPrint}
          />

        </div>
      </div>
      <PrintModal open={activeModal === 'print'} handleClose={handleCloseModal} emp={selectedEmployee} />
      <ConfirmDeleteModal open={activeModal === 'delete'} emp={selectedEmployee} onCancel={handleCloseModal} onConfirm={handleDelete} />
      <EmployeeFormModal onSubmit={handleSaveEmployee} onClose={handleCloseModal} open={activeModal == 'add-edit'} initialData={selectedEmployee} />
    </div>
  )
}

export default Dashboard


