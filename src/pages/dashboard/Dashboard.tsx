import Sidebar from "../../components/sidebar/Sidebar";

export default function Dashboard() {
  return (
    <>
      {/* Sidebar */}
      <Sidebar activeMenu='' />

      {/* Main Content */}
      <main className="w-[76%] px-5 overflow-y-auto ml-[24%]">
        <h1 className="text-4xl text-center font-bold mt-10 mb-4">Dashboard</h1>
        <div className="text-center text">
          <p>Welcome to the Dashboard!</p>
        </div>
      </main>
    </>
  );
}
