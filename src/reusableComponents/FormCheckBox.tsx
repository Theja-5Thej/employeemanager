import { useField } from "formik";

type Props = {
  name: string;
  label: string;
};

export const FormCheckbox = ({ name, label }: Props) => {
  const [field] = useField({ name, type: "checkbox" });

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        {...field}
        checked={field.value}
        className="h-4 w-4 accent-violet-700"
      />
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
};
