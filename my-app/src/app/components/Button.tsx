interface ButtonProps {
    label: string;
}
export default function Button({label}: ButtonProps) {
    return (
        <div>
            <button className="bg-white hover:bg-dark text-dark hover:text-white font-bold py-2 px-4 rounded">
                {label}
            </button>
        </div>
    )
}