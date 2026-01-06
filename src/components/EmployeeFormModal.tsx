import React from "react";
import { Modal, Box } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import type { Employee } from "./EmployeeTable";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { states } from "../utils/States";
export type EmployeeForm = Omit<Employee, "id" > & {
  id?: string;
  gender?: "Male" | "Female" | "Other" ;
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
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="space-y-4">
              <div className="mb-2">
                <label htmlFor="fullName" >Full name *</label>
                <Field
                  name="fullName"
                  id="fullName"
                  placeholder="Enter full name"
                  className="w-full px-4 py-2 border rounded-md h-10!"
                />
                {touched.fullName && errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName}</p>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="dob" >Date of birth *</label>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={values.dob ? dayjs(values.dob) : null}
                    onChange={(value) =>
                      setFieldValue("dob", value ? value.format("YYYY-MM-DD") : "")
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: touched.dob && Boolean(errors.dob),
                        helperText: touched.dob && errors.dob,
                        sx: {
                          "& .MuiPickersInputBase-root ": {
                            border: '1px solid oklch(0.278 0.033 256.848)'!,
                            outline: 'none'!,
                            borderRadius: '6px'
                          },

                          "& .MuiPickersSectionList-root": {
                            height: 38,
                            padding: "8px 8px",
                          },
                          "& p.Mui-error": {
                            marginLeft: 0,
                            color: 'oklch(0.637 0.237 25.331)',
                            fontSize: '14px',
                            fontWeight: 500
                          }
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="mb-2" >
                <label htmlFor="gender" >Gender *</label>
                <Field
                  as="select"
                  name="gender"
                  id="gender"
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>

                </Field>
                {touched.gender && errors.gender && (
                  <p className="text-red-500 text-sm">{errors.gender}</p>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="state" >State *</label>

                <Field
                  as="select"
                  name="state"
                  id="state"
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Field>
                {touched.state && errors.state && (
                  <p className="text-red-500 text-sm">{errors.state}</p>
                )}
              </div>

              <div className="flex mb-2 items-start justify-between gap-4">
                <div className="w-full">
                  <label htmlFor="profileImage" className="block mb-1 font-medium">
                    Profile Image *
                  </label>

                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    className="border block rounded-md h-10 w-full py-2 px-2"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFieldValue("profileImage", reader.result);
                      };
                      reader.readAsDataURL(file);
                    }}
                  />

                  {touched.profileImage && errors.profileImage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.profileImage}
                    </p>
                  )}
                </div>

                {values.profileImage && (
                  <img
                    src={values.profileImage}
                    alt="Preview"
                    className="border h-20 w-20 rounded-full object-cover"
                  />
                )}
              </div>


              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={values.isActive}
                  onChange={() =>
                    setFieldValue("isActive", !values.isActive)
                  }
                />
                Active
              </label>

              {/* Actions */}
              <div className="flex justify-end gap-3 ">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md text-white border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md bg-violet-700! text-white"
                >
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
