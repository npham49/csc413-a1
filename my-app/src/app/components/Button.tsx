interface ButtonProps {
    label: string;
    width?: string; // Optional width prop
    height?: string; // Optional height prop
}

export default function Button({ label, width = "100px", height = "50px" }: ButtonProps) {
    return (
        <div>
            <button
                className="bg-white hover:bg-dark text-dark hover:text-white font-bold rounded"
                style={{ width, height }} // Apply dynamic width and height
            >
                {label}
            </button>
        </div>
    );
}