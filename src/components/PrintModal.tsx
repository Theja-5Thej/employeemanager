import { Box, Modal } from "@mui/material"
import type { Employee } from "./EmployeeTable"
import EmployeePDFDownload from "./EmployeePDFDownload";
import React from "react";
type modelParams = {
    open: boolean;
    handleClose: () => void;
    emp: Employee | null;
};

const PrintModal = ({ open, handleClose, emp }: modelParams) => {


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="emp-print-modal"
        >
            <Box
                className="
      absolute
      top-1/2 left-1/2
      -translate-x-1/2 -translate-y-1/2
      w-[90%] max-w-lg
      bg-white
      rounded-lg
      shadow-xl
      p-6
      outline-none
    "
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Employee Details
                    </h2>
                </div>

                {/* Content */}
                <div className="text-gray-700">
                    {emp ? <div>
                        <img
                            src={emp?.profileImage}
                            alt={emp?.fullName}
                            width={120}
                        />

                        <p><strong>ID:</strong> {emp.id}</p>
                        <p><strong>Name:</strong> {emp.fullName}</p>
                        <p><strong>Gender:</strong> {emp.gender}</p>
                        <p><strong>DOB:</strong> {emp.dob}</p>
                        <p><strong>State:</strong> {emp.state}</p>
                        <p>
                            <strong>Status:</strong>{" "}
                            {emp.isActive ? "Active" : "Inactive"}
                        </p>
                    </div> : <div> No details selected</div>}

                </div>


                {/* Footer */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 rounded-xl text-white! border hover:bg-gray-100"
                    >
                        Close
                    </button>

                    <EmployeePDFDownload employee={emp} />
                </div>
            </Box>
        </Modal>

    )
}

export default React.memo(PrintModal);


