import React from "react";
import type { Employee } from "./EmployeeTable";
import { Modal, Box } from "@mui/material";

type ConfirmDeleteModalProps = {
  open: boolean;
  emp?: Employee | null;
  onConfirm: (id:string | undefined) => void;
  onCancel: () => void;
};

const ConfirmDeleteModal = ({
  open,
  emp,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) => {
  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="delete-confirmation-title"
      aria-describedby="delete-confirmation-description"
    >
      <Box className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6">
        <h2
          id="delete-confirmation-title"
          className="text-xl font-semibold text-gray-800"
        >
          Confirm Delete
        </h2>

        <p
          id="delete-confirmation-description"
          className="mt-3 text-gray-600"
        >
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800">
            {emp?.fullName}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-100 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={()=>onConfirm(emp?.id)}
            className="px-4 py-2 rounded-lg bg-red-600! text-white hover:bg-red-700!"
          >
            Delete
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default React.memo(ConfirmDeleteModal) ;
