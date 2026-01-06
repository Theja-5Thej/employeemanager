import { useField } from "formik";

type Props = {
  label: string;
  name: string;
};

export const FormImagePicker = ({ label, name }: Props) => {
  const [, meta, helpers] = useField(name);

  return (
    <div className="flex gap-4 mb-2">
      <div className="w-full">
        <label>{label}</label>

        <input
          type="file"
          accept="image/*"
          className={`border rounded-md h-10 w-full px-2 py-2 h-10.2
            ${meta.touched && meta.error ? "border-red-500" : ""}`}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onloadend = () => {
              helpers.setValue(reader.result);
            };
            reader.readAsDataURL(file);
          }}
        />

        {meta.touched && meta.error && (
          <p className="text-red-500 text-sm">{meta.error}</p>
        )}
      </div>

      {meta.value && (
        <img
          src={meta.value}
          className="h-20 w-20 rounded-full border object-cover"
        />
      )}
    </div>
  );
};
