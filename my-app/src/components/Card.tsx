import Link from "next/link";
interface CardProps {
    name: string;
    icon: string;
}
export default function Card({name, icon}:CardProps) {
    return (
        <Link href="/edit">
            <div className="flex flex-col items-center justify-center bg-card w-[400px] h-[500px] rounded-[40px] space-y-12">
                
                    <img src={icon} alt={name} />
                    <h2 className="text-4xl text-white">
                        {name}
                    </h2>
                
            </div>
        </Link>
    )
}