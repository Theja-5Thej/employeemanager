import { useField } from "formik";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  name: string;
  options: Option[];
};

export const FormSelect = ({ label, name, options }: Props) => {
  const [field, meta] = useField(name);

  return (
    <div className="mb-2">
      <label htmlFor={name}>{label}</label>

      <select
        {...field}
        className={`w-full px-4 py-2 border rounded-md h-10.5
          ${meta.touched && meta.error ? "border-red-500" : ""}`}
      >
        <option value="">Select</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm">{meta.error}</p>
      )}
    </div>
  );
};
