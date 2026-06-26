import { createBrowserRouter } from "react-router";
import PageTransition from "@/components/PageTransition";
import OnboardingPage from "@/pages/OnboardingPage";
import QuizPage from "@/pages/QuizPage";
import ResultPage from "@/pages/ResultPage";
import ArchetypesPage from "@/pages/ArchetypesPage";

export const router = createBrowserRouter([
  {
    Component: PageTransition,
    children: [
      { path: "/",           Component: OnboardingPage },
      { path: "/quiz",       Component: QuizPage },
      { path: "/result",     Component: ResultPage },
      { path: "/archetypes", Component: ArchetypesPage },
    ],
  },
]);
