import { useContext } from "react";
import { FormQuestions } from "./components/Questions/formQuestions";
import { QuestionsContext } from "./context/QuestionsContext";
import { SetQuestions } from "./components/Questions/setQuestions";


export default function App() {
  const { questions } = useContext(QuestionsContext);

  return (
    <div className="App">

      { !questions.length
        ? <SetQuestions />
        : <FormQuestions questions={questions} />
      }

    </div>
  );
}
