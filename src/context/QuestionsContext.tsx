import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

import axios from "axios";
import produce from "immer";

type QuestionProviderProps = {
  children: ReactNode
}

type QuestionContextData = {
  questions: Question[];
  setValue: (value: number) => void;
  saveAnswers: (answers: Record<string, string>) => void;
}

export type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  givenAnswer?: string;
  answers: Array<string>;
};

export const QuestionsContext = createContext({} as QuestionContextData)

export function QuestionsProvider({ children }: QuestionProviderProps) {
  const [questions, setQuestions] = useState<Question[]>([]);

  const setValue = useCallback( async (value: number) => {
    const result = await getQuestions(value);
    setQuestions(result);
  }, [])

  const saveAnswers = useCallback((answers: Record<string, string>) => {
    setQuestions(produce(oldQuestions => {
      for (const key in answers) {
        oldQuestions[parseInt(key)].givenAnswer = answers[key];
      }
      localStorage.setItem('questions', JSON.stringify(oldQuestions))
    }))
  }, [])

    return (
    <QuestionsContext.Provider value={{ questions, setValue, saveAnswers }}>
      {children}
    </QuestionsContext.Provider>
  )
}

export async function getQuestions(amount: number): Promise<Question[]> {
  const { data } = await axios.get<{
    response_code: number;
    results: Array<{
      category: string;
      type: string;
      difficulty: string;
      question: string;
      correct_answer: string;
      incorrect_answers: string[];
    }>;
  }>(`https://opentdb.com/api.php`, {
    params: {
      amount,
      type: ''
    }
  });

  return data.results.map((item) => ({
    category: item.category,
    difficulty: item.difficulty,
    correctAnswer: item.correct_answer,
    question: item.question,
    type: item.type,
    answers: [...item.incorrect_answers, item.correct_answer]
  }));
}
