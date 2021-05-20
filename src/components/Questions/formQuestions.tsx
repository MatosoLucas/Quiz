import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useContext, } from "react";
import { Question, QuestionsContext } from "../../context/QuestionsContext";

type FormQuestionsType = {
  questions: Question[];
}

export function FormQuestions({ questions }: FormQuestionsType) {

  const { saveAnswers, setValue } = useContext(QuestionsContext);


  const handleSubmit = (values: Record<string, string>) => {
    console.log(values)
    saveAnswers(values)
  }

  return (
    <Box>
      <Formik initialValues={{}} onSubmit={handleSubmit}>
      {({ values, setFieldValue }) => (
        <Form>
          {JSON.stringify(values)}
          {questions?.map((question, index) => (
            <Box key={question.question} paddingBottom={4}>
              <FormControl component="fieldset" >
                <FormLabel component="legend">{question.question} {question.difficulty}</FormLabel>
                <RadioGroup aria-label="quiz" name={index.toString()} onChange={(e) => setFieldValue(index.toString(), e.target.value)} >
                  {question.answers.map((answer) => (
                    <FormControlLabel value={answer} control={<Radio />} label={answer} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          ))}
          <Button onClick={() => setValue(0)}>Cancel</Button>
          <Button type="submit">Submit Answers</Button>
        </Form>
        )}
      </Formik>
    </Box>
  )
}