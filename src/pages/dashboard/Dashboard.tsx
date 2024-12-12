import Sidebar from "../../components/sidebar/Sidebar";

export default function Dashboard() {
  return (
    <>
      {/* Sidebar */}
      <Sidebar activeMenu='' />

      {/* Main Content */}
      <main className="w-[76%] p-4 mt-2 overflow-y-auto ml-[24%]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-3">Dashboard</h1>
          <div className="text">
            <p>Welcome to the Dashboard!</p>
          </div>
        </div>
      </main>
    </>
  );
}
