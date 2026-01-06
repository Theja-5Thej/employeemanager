import React from "react";
import { Modal, Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import type { Employee } from "./EmployeeTable";
import { states } from "../utils/States";
import { FormInput } from "../reusableComponents/FromInput";
import { FormDatePicker } from "../reusableComponents/FormDatePicker";
import { FormSelect } from "../reusableComponents/FormSelect";
import { FormImagePicker } from "../reusableComponents/FormImagePicker";
import { FormCheckbox } from "../reusableComponents/FormCheckBox";
export type EmployeeForm = Omit<Employee, "id"> & {
  id?: string;
  gender?: "Male" | "Female" | "Other";
};

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeForm) => void;
  initialData?: EmployeeForm | null;
}


const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.string().required("Date of birth is required"),
  state: Yup.string().required("State is required"),
  profileImage: Yup.string()
    .required("Profile image is required"),
});

const EmployeeFormModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="absolute top-1/2 left-1/2 w-[95%] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 text-gray-800">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Employee" : "Add Employee"}
        </h2>

        <Formik<EmployeeForm>
          initialValues={{
            id: initialData?.id,
            fullName: initialData?.fullName || "",
            gender: initialData?.gender || "Male",
            dob: initialData?.dob || "",
            state: initialData?.state || "",
            isActive: initialData?.isActive ?? true,
            profileImage: initialData?.profileImage || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values);
            onClose();
          }}
        >
          {({ values, touched, setFieldValue, errors }) => (
            <Form className="space-y-4">
              <FormInput label="Full Name *" name="fullName" />
              <FormDatePicker
                label="Date of Birth *"
                name="dob"
                value={values.dob}
                setFieldValue={setFieldValue}
                error={touched.dob ? errors.dob : ""}
              />
              <FormSelect
                label="Gender *"
                name="gender"
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                  { label: "Other", value: "Other" },
                ]}
              />
              <FormSelect
                label="State *"
                name="state"
                options={states.map(s => ({ label: s, value: s }))}
              />
              <FormImagePicker label="Profile Image *" name="profileImage" />
              <FormCheckbox name="isActive" label="Active" />
              <div className="flex items-center gap-2 text-white justify-end mt-5 w-full">
                <button type="button" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="bg-violet-700! text-white">
                  {initialData ? "Update" : "+ Add"}
                </button>
              </div>
            </Form>


          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default React.memo(EmployeeFormModal);
