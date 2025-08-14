import { toast } from "sonner";
import type { TodoType } from "../appTypes";

const todoPrompts = [
  "Got something brewing in your brain? Toss it in here!",
  "Your future self will thank you for writing this down.",
  "Feed me tasks. I'm starving!",
  "What's on today's episode of *Your Life*?",
  "One small step for you, one giant leap for productivity.",
  "Let's make your to-dos jealous of your done list.",
  "Type away, mighty task conqueror!",
  "The kingdom awaits your royal decree… what shall we do today?",
  "The prophecy foretold… you have tasks to add.",
  "Every great hero starts with a quest. What's yours?",
  "Winter is coming… better write it down.",
  "In a world full of chaos, your to-do list is your lightsaber.",
  "Achievement unlocked: Adding a task.",
];

const templates = [
  (t: string) => `🎉 Done: "${t}" — you're a legend!`,
  (t: string) => `✅ "${t}" — finished! Time for a victory snack.`,
  (t: string) => `🚀 "${t}" complete — keep soaring!`,
  (t: string) => `✨ "${t}" finished. Small wins > big wins.`,
  (t: string) => `👏 Great job finishing "${t}" — proud of you!`,
];

export function showCongratsToast(taskName = "Task") {
  const tmpl = templates[Math.floor(Math.random() * templates.length)];
  toast.message(tmpl(taskName), {
    description: "Nice work — keep it up!",
    duration: 3500,
  });
}

export function getRandomPrompt() {
  return todoPrompts[Math.floor(Math.random() * todoPrompts.length)];
}

export const getPriorityNumber = (todo: TodoType) => {
  if (todo?.priority === "high") {
    return "!!!";
  } else if (todo?.priority === "medium") {
    return "!!";
  } else {
    return "!";
  }
};

export const getPriorityString = (priority: string) => {
  if (priority === "!!!") {
    return "high";
  } else if (priority === "!!") {
    return "medium";
  } else {
    return "low";
  }
};

export function getApologyToast() {
  toast("🛠️ Whoopsie-doodle!", {
    description:
      "This feature is still in the oven 🍪 — I'm cooking it up and it'll be ready soon!",
    duration: 2500,
  });
}
