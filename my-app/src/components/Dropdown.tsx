interface DropDownProps {
    label: string;
    options: string[];
    defaultValue?: string; // Optional default value
    onChange: (value: string) => void; // Add this prop
}

export default function DropDown({ label, options, defaultValue, onChange }: DropDownProps) {
    return (
        <div className="flex flex-col w-34 space-y-3">
            <label className="text-white text-xl">{label}</label>
            <select
                className="bg-white text-dark font-bold py-2 px-4 rounded"
                value={defaultValue} // Set the default value
                onChange={(e) => onChange(e.target.value)} // Trigger onChange
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}