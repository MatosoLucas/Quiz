import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, styled } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useContext } from "react";
import { Question, QuestionsContext } from "../../context/QuestionsContext";

type FormQuestionsType = {
  questions: Question[];
}

const QuestionBox = styled(Box)({
  display: 'flex',
  paddingBottom: '12px',
  color: '#1f3ce0',
  fontSize: '18px'
})

const ButtonBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})


const FormContainer = styled(Container)({
  display: 'flex',
  marginTop: '10px',
  maxWidth: '900px',
  padding: '24px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  border: '1px solid #646464',
  background: '#ebebeb'
})

const CancelButton = styled(Button)({
  background: '#d65151',
  '&:hover': {
    background: "#f37676",
  },
  color: 'white',
  border: 0,
  borderRadius: 3,
  height: 36,
  padding: '0 8px 0 8px',
  boxShadow: '0 3px 5px 2px #b8000084',
})

const SubmitButton = styled(Button)({
  background: '#5e80f0FF',
  '&:hover': {
    background: "#7695fc",
  },
  color: 'white',
  border: 0,
  borderRadius: 3,
  height: 36,
  padding: '0 8px 0 8px',
  boxShadow: '0 3px 5px 2px #003ab85e',
})


export function FormQuestions({ questions }: FormQuestionsType) {

  const { saveAnswers, setValue, isReporting, setIsReporting } = useContext(QuestionsContext);

  const handleReport = () => {
    setIsReporting(!isReporting)
  }

  const handleSubmit = (values: Record<string, string>) => {
    console.log(values)
    saveAnswers(values)
    handleReport()
  }

  return  (
    <FormContainer>
      <Formik initialValues={{}} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            {questions?.map((question, index) => (
              <Box key={question.question} paddingBottom={4}>
                <FormControl component="fieldset" >
                  <FormLabel component="legend" >
                    <QuestionBox>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            `${question.question} (${question.difficulty})`
                        }}
                      />
                    </QuestionBox>
                  </FormLabel>
                  <RadioGroup aria-label="quiz" name={index.toString()} onChange={(e) => setFieldValue(index.toString(), e.target.value)} >
                    {question.answers.map((answer) => (
                      <FormControlLabel value={answer} control={<Radio />}
                        label={
                          <div
                            dangerouslySetInnerHTML={{
                              __html: `${answer}`
                            }}
                          />
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            ))}
            <ButtonBox>
              <CancelButton onClick={() => setValue(0)}>Cancel</CancelButton>
              <SubmitButton type="submit">Submit Answers</SubmitButton>
            </ButtonBox>
          </Form>
        )}
      </Formik>
    </FormContainer>
  )
}