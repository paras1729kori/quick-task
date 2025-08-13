import _ from "lodash";
import { toast } from "sonner";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { addTodo, getTodos } from "../../services/todo";
import type { TodoFilters, TodoType } from "../../appTypes";
import { getPriorityString } from "../../common/utils";

export default function AddTask({
  appliedFilters,
  setAppliedFilters,
  setTodos,
}: {
  appliedFilters: TodoFilters;
  setAppliedFilters: React.Dispatch<React.SetStateAction<TodoFilters>>;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}) {
  const { user } = useAuth();
  const todoInputRef = useRef<HTMLInputElement>(null);

  const [isSearchTask, setIsSearchTask] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [priority, setPriority] = useState<"!" | "!!" | "!!!">("!");

  useEffect(() => {
    if (todoInputRef?.current) {
      todoInputRef?.current?.focus();
    }
  }, []);

  const handleAddTodo = async () => {
    if (_.isEmpty(task)) {
      toast.warning("Please type to add a task");
      return;
    }
    const taskBody = {
      userId: user?.id?.toString(),
      title: task,
      priority: getPriorityString(priority),
    };
    await addTodo(taskBody, user?.jwtToken);
    setTodos(await getTodos(user?.jwtToken));
    toast.success("Task has been created.");
    setTask("");
    setPriority("!");
  };

  useEffect(() => {
    (async () => {
      const data = await getTodos(user?.jwtToken, appliedFilters);
      setTodos(data);
    })();
  }, [appliedFilters]);

  return (
    <section className="w-full flex flex-col items-center">
      <section className="w-full flex items-center gap-2">
        {/* Priority selector */}
        <div className="dropdown min-w-[56px]">
          <div tabIndex={0} role="button" className="w-full btn m-1">
            {priority}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li onClick={() => setPriority("!")}>
              <a>!</a>
            </li>
            <li onClick={() => setPriority("!!")}>
              <a>!!</a>
            </li>
            <li onClick={() => setPriority("!!!")}>
              <a>!!!</a>
            </li>
          </ul>
        </div>

        {/* Todo */}
        <label className="input w-full">
          <svg
            tabIndex={0}
            role="button"
            className="h-[2em] cursor-pointer p-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={() => setIsSearchTask(!isSearchTask)}
            onKeyDown={(e) => {
              if (e.key === " " || e.code === "Space") {
                e.preventDefault();
                setIsSearchTask(!isSearchTask);
              }
            }}
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          {isSearchTask && <p className="text-xs">Searching</p>}
          <input
            id="task"
            ref={todoInputRef}
            type="search"
            className="grow"
            placeholder="Type to add a task or search"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
              if (isSearchTask) {
                setAppliedFilters({
                  ...appliedFilters,
                  search: e.target.value,
                });
              }
            }}
          />
        </label>

        {/* Button */}
        <button
          className={`btn btn-square mr-1`}
          onClick={handleAddTodo}
          disabled={isSearchTask}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </button>
      </section>
      <section className="relative w-full flex gap-2 items-start px-2 overflow-auto noScrollbar">
        <FilterButton
          title="Completed Tasks"
          status="completed"
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
        />
        <FilterButton
          title="Pending Tasks"
          status="pending"
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
        />
        <FilterButton
          title="High Priority"
          priority="high"
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
        />
        <FilterButton
          title="Medium Priority"
          priority="medium"
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
        />
        <FilterButton
          title="Low Priority"
          priority="low"
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
        />
      </section>
    </section>
  );
}

const FilterButton = ({
  title,
  status,
  priority,
  appliedFilters,
  setAppliedFilters,
}: {
  title: string;
  status?: string;
  priority?: string;
  appliedFilters: TodoFilters;
  setAppliedFilters: React.Dispatch<React.SetStateAction<TodoFilters>>;
}) => {
  return (
    <button
      onClick={() => {
        if (status && !priority) {
          if (appliedFilters?.status === status) {
            setAppliedFilters({ ...appliedFilters, status: "" });
            return;
          }
          setAppliedFilters({ ...appliedFilters, status });
        } else if (!status && priority) {
          if (appliedFilters?.priority === priority) {
            setAppliedFilters({ ...appliedFilters, priority: "" });
            return;
          }
          setAppliedFilters({ ...appliedFilters, priority });
        }
      }}
      className={`text-xs btn font-light hover:bg-slate-200 badge border border-slate-300 ${
        (appliedFilters?.status === status ||
          appliedFilters?.priority === priority) &&
        "bg-slate-600 text-white hover:bg-slate-500"
      }`}
    >
      {title}
    </button>
  );
};
