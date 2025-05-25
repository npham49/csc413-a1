interface ButtonProps {
    label: string;
    width?: string; // Optional width prop
    height?: string; // Optional height prop
    opacity?: string; // Optional opacity prop
    color?: string; // Optional color prop
}

export default function Button({ label, width = "100px", height = "50px", opacity = "1", color = "white" }: ButtonProps) {
    return (
        <div>
            <button
                className="text-dark font-bold rounded"
                style={{ width, height, opacity, backgroundColor: color }} // Apply dynamic width, height, opacity, and color
            >
                {label}
            </button>
        </div>
    );
}