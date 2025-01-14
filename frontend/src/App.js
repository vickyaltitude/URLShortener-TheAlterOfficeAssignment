import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";



function App() {
  return (
    <div className='flex h-screen'>
          <Sidebar />
          <MainContent />
    </div>
  );
}

export default App;
