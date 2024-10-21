import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/customHooks';
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const notification = useAppSelector((state) => state.notification);
  const notificationClass = `transition-opacity duration-1000 ${notification.fadeout ? 'opacity-0' : 'opacity-100'}`;
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>

        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" to="/">
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-primary">{pageName}</li>
          </ol>
        </nav>
      </div>
      {notification.message && <div
        className={`w-full text-white  p-4 ${
          notification.type === 'success' ? 'bg-green-600' : ''
        }
        ${notification.type === 'info' ? 'bg-indigo-300' : '' }
        ${notificationClass}
        `}
      >
        <p> {notification.message} </p>
      </div>}
    </>
  );
};

export default Breadcrumb;
