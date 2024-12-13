import { Link, useNavigate } from 'react-router-dom';
import { SidebarProps } from './types';

export default function Sidebar({ activeMenu }: SidebarProps) {
  const navigate = useNavigate();

  // Sidebar menu items
  const sidebarMenu = [
    'Lessons',
    'Add Lessons',
    'Add Vocabularies',
    'Lesson Management',
    'Vocabulary Management',
    'Manage Users',
  ];

  // Handle navigation
  const handleNavigation = (menu: string) => {
    const baseMenu = menu.trim().replace(/ /g, '-').toLowerCase();
    navigate(`/dashboard/${baseMenu}`);
  };

  return (
    <nav className="h-full w-[24%] bg-gray-100 flex flex-col border-r fixed top-0 bottom-0 left-0 mt-[63px] md:mt-[70px]">
      {/* Sidebar Header */}
      <div className="text-center py-5 border-b border-gray-200 mb-4">
        <Link to="/dashboard" className="text-lg md:text-2xl font-bold text-gray-800">
          Dashboard
        </Link>
      </div>

      {/* Sidebar Menu */}
      <div className="flex-grow overflow-y-auto px-1 md:px-5">
        <ul>
          {sidebarMenu.map((menu) => (
            <li key={menu} className="mb-4">
              <div
                onClick={() => handleNavigation(menu)}
                className={`cursor-pointer text-xs md:text-lg font-bold py-1.5 px-1 md:px-4 rounded ${activeMenu === menu
                  ? 'bg-gray-400 text-gray-800'
                  : 'hover:bg-gray-300 text-gray-600'
                  }`}
              >
                {menu}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
