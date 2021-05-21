import { useContext } from "react";
import { FormQuestions } from "./components/Questions/formQuestions";
import { QuestionsContext } from "./context/QuestionsContext";
import { SetQuestions } from "./components/Questions/setQuestions";
import { QuestionsReport } from "./components/Questions/questionsReport";


export default function App() {
  const { questions, isReporting } = useContext(QuestionsContext);

  return (
    <div className="App">

      { !questions.length
        ? <SetQuestions />
        : !isReporting ? <FormQuestions questions={questions} /> : <QuestionsReport showButton />
      }

    </div>
  );
}
