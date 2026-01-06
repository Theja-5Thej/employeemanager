import { useField } from "formik";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
};

export const FormInput = ({
  label,
  ...props
}: Props) => {
  const [field, meta] = useField(props.name);

  return (
    <div className="mb-2">
      <label htmlFor={props.name}>{label}</label>

      <input
        {...field}
        {...props}
        className={`w-full px-4 py-2 border rounded-md h-10
          ${meta.touched && meta.error ? "border-red-500" : ""}`}
      />

      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm">{meta.error}</p>
      )}
    </div>
  );
};
