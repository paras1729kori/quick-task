import { toast } from "sonner";

import type { TodoFilters, TodoType } from "../../appTypes";
import { deleteTodo, getTodos, updateTodo } from "../../services/todo";
import { useAuth } from "../../contexts/AuthProvider";
import { useDeviceType } from "../../hooks/useDeviceType";
import {
  getPriorityNumber,
  getPriorityString,
  showCongratsToast,
} from "../../common/utils";

export default function Task({
  todo,
  setTodos,
  appliedFilters,
}: {
  todo: TodoType;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  appliedFilters: TodoFilters;
}) {
  const { user } = useAuth();
  const deviceType = useDeviceType();

  const handlePriorityChange = async (priority: string) => {
    const todoData: TodoType = {
      ...todo,
      priority: getPriorityString(priority),
    };
    await updateTodo(todoData, user?.jwtToken);
    setTodos(await getTodos(user?.jwtToken, appliedFilters));
    toast.message("Task updated", {
      description: "Priority updated to " + getPriorityString(priority),
    });
  };
  const handleDone = async () => {
    const todoData: TodoType = {
      ...todo,
      status: todo?.status === "completed" ? "pending" : "completed",
    };
    await updateTodo(todoData, user?.jwtToken);
    setTodos(await getTodos(user?.jwtToken, appliedFilters));
    toast.message("Task updated", {
      description: "Marked as " + todoData?.status,
    });
  };
  const handleDelete = async () => {
    await deleteTodo(todo?.id, user?.jwtToken);
    setTodos(await getTodos(user?.jwtToken, appliedFilters));
    showCongratsToast();
  };

  return (
    <li
      className={`p-4 border border-slate-300 rounded-sm flex flex-col items-start md:flex-row md:items-center gap-2 justify-between ${
        todo?.status === "completed" && "line-through"
      }`}
    >
      <div className={`w-full flex gap-2 items-start justify-between flex-1`}>
        <div
          className={`flex-1 flex ${
            todo?.description ? "items-start" : "items-center"
          } gap-4`}
        >
          <div className="dropdown w-[56px]">
            <div tabIndex={0} role="button" className="w-full btn m-1">
              {getPriorityNumber(todo)}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li onClick={() => handlePriorityChange("!")}>
                <a>!</a>
              </li>
              <li onClick={() => handlePriorityChange("!!")}>
                <a>!!</a>
              </li>
              <li onClick={() => handlePriorityChange("!!!")}>
                <a>!!!</a>
              </li>
            </ul>
          </div>

          <div className="">
            <p className="font-semibold">{todo?.title}</p>
            {todo?.description && (
              <p className="text-xs text-left md:text-justify">
                {todo?.description}
              </p>
            )}
          </div>
        </div>

        {deviceType === "mobile" && (
          <div className="relative dropdown dropdown-end">
            <svg
              tabIndex={0}
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots-vertical float-right"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>
            <ul
              tabIndex={0}
              className="absolute top-full dropdown-content menu bg-base-100 rounded-box z-1 w-32 p-2 shadow-sm"
            >
              <li>
                <button className={`btn`} onClick={handleDone}>
                  {todo?.status === "pending" ? "Done" : "Pending"}
                </button>
              </li>
              <li className="mt-2">
                <button className="btn" onClick={handleDelete}>
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {deviceType === "desktop" && (
        <div className="w-full md:w-fit flex items-center gap-2 justify-end">
          <button className={`btn btn-square btn-ghost`} onClick={handleDone}>
            {todo?.status === "completed" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-check2"
                viewBox="0 0 16 16"
              >
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-hourglass"
                viewBox="0 0 16 16"
              >
                <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5m2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702c0 .7-.478 1.235-1.011 1.491A3.5 3.5 0 0 0 4.5 13v1h7v-1a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351v-.702c0-.7.478-1.235 1.011-1.491A3.5 3.5 0 0 0 11.5 3V2z" />
              </svg>
            )}
          </button>

          <button className="btn btn-square btn-ghost" onClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </button>
        </div>
      )}
    </li>
  );
}
