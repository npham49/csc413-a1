import Card from "../components/Card";
export default function Choosing() {
    const title = "<Make your app on>";
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground space-y-40">
            <h1 className="text-5xl text-center font-primary">
                {title}
            </h1>
            <div>
                <div className="flex flex-row space-x-80">
                        <Card 
                            name="Website" 
                            icon="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/web.png?alt=media&token=35f61431-71c3-4d42-a8f4-86288506b065" 
                        />
                        <Card 
                            name="Mobile" 
                            icon="https://firebasestorage.googleapis.com/v0/b/personal-web-4022f.firebasestorage.app/o/mobile.png?alt=media&token=f7d5e815-6901-4de4-a976-671bee7f96fd" 
                        />
                </div>  
            </div>
            
        </div>
    );
}