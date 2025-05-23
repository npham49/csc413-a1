import Link from "next/link";
export default function Home() {
  const title = "<Codify>";
  return (
    <div className="flex flex-col items-center h-screen bg-background text-foreground space-y-40">
      <h1 className='font-primary text-8xl pt-[100px]'>{title}</h1>
      <div className="bg-primary w-[300px] h-[100px] rounded-[40px] flex items-center justify-center relative">
        <Link href="/choosing">
              <button className="font-primary text-white text-4xl">Start</button>
        </Link>
      </div>
      <img className="absolute bottom-0" 
          src="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/Vector.png?alt=media&token=25ee2152-415a-4ce1-8827-4d2c6a833ffc" 
          alt="Image"/>
    </div>
  );
}
