import DraggingBar from "../components/DraggingBar";
import WorkingScreen from "../components/WorkingScreen";
export default function EditPage() {
  return (
    <div className="flex flex-row h-screen bg-background">
      {/* <h1 className="text-4xl text-white">Edit Page</h1>
      <p className="text-lg text-gray-400">This is the edit page.</p> */}
      <DraggingBar/>
      <WorkingScreen/>
    </div>
  );
}