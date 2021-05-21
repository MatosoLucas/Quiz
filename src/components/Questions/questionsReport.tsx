import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, styled } from "@material-ui/core";
import { useContext } from "react";
import { QuestionsContext } from "../../context/QuestionsContext";

const QuestionBox = styled(Box)({
  display: 'flex',
  paddingBottom: '12px',
  color: '#1f3ce0',
  fontSize: '18px'
})

const FormBox = styled(Box)({
  width: '100%',
  paddingBottom: '16px',
})

const FormContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  margin: '10px auto',
  maxWidth: '900px',
  maxHeight: '90vh',
  padding: '24px',
  borderRadius: '12px',
  border: '1px solid #646464',
  background: '#ebebeb',
  overflow: 'auto'
})

const ReturnButton = styled(Button)({
  background: '#5e80f0FF',
  '&:hover': {
    background: "#7695fc",
  },
  margin: '0 auto',
  color: 'white',
  border: 0,
  borderRadious: 3,
  height: 36,

  padding: '0 24px',
  boxShadow: '0 3px 5px 2px #003ab85e',
})


export function QuestionsReport({ showButton }: {showButton?: boolean}) {

  const { storedForm, setValue } = useContext(QuestionsContext);

  const score = storedForm.filter(questions => questions.givenAnswer === questions.correctAnswer).length

  const handleReturn = () => {
    setValue(0)
  }

  return(
       <FormContainer>
            {storedForm?.map(questions => (
              <FormBox key={questions.question}>
                <FormControl component="fieldset" >
                  <FormLabel component="legend" >
                    <QuestionBox>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            `${questions.question} (${questions.difficulty})`
                        }}
                      />
                    </QuestionBox>
                  </FormLabel>
                  <RadioGroup aria-label="quiz" value={questions.givenAnswer}>
                    {questions.answers.map(answer => (
                       answer === questions.givenAnswer ? 
                       <FormControlLabel value={answer} control={<Radio />}
                        label={
                          <div 
                            dangerouslySetInnerHTML={{
                              __html: `${answer} ${answer === questions.correctAnswer ? "✅" : ''}`
                            }}
                          />
                        }
                      />
                       :
                      <FormControlLabel value={answer} disabled control={<Radio />}
                        label={
                          <div 
                            dangerouslySetInnerHTML={{
                              __html: `${answer} ${answer === questions.correctAnswer ? "✅" : ''}`
                            }}
                          />
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormBox>
            ))}
            <span>Your last score was: {score} points!</span>
            { showButton && <ReturnButton onClick={handleReturn}>Return</ReturnButton> }
    </FormContainer>
  )
}