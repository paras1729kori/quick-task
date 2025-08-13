import { useEffect, useState } from "react";
import { AddTask, Task } from ".";
import { getRandomPrompt } from "../../common/utils";
import type { TodoFilters, TodoType } from "../../appTypes";

export default function Main() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<TodoFilters>({
    status: "",
    priority: "",
    search: "",
  });

  useEffect(() => {
    const current_auth_mode = sessionStorage.getItem("current_auth_mode");
    const token = sessionStorage.getItem("token");
    if (current_auth_mode) {
      sessionStorage.removeItem("current_auth_mode");
    }
    if (token) {
      sessionStorage.removeItem("token");
    }
  }, []);

  return (
    <main className="relative flex-1 w-[95%] md:max-w-2xl lg:max-w-4xl flex flex-col gap-2 z-10 overflow-auto noScrollbar">
      <section className="w-full sticky top-0 z-20 pb-1 bg-white">
        <AddTask
          setTodos={setTodos}
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
        />
      </section>
      {todos && todos?.length > 0 ? (
        <ul className="absolute top-[80px] w-full list gap-2 bg-base-100 rounded-box shadow-md z-10">
          {todos?.map((todo) => {
            return (
              <Task
                key={todo?.id}
                todo={todo}
                setTodos={setTodos}
                appliedFilters={appliedFilters}
              />
            );
          })}
        </ul>
      ) : (
        <p className="text-slate-400 mt-8 text-center">{getRandomPrompt()}</p>
      )}
    </main>
  );
}
