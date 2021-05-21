import { Box, Button, Container, Modal, styled } from "@material-ui/core";
import { useContext, useState } from "react";
import { QuestionsContext } from "../../context/QuestionsContext";
import { QuestionsReport } from "./questionsReport";

const CancelButton = styled(Button)({
  background: '#d65151',
  '&:hover': {
    background: "#f37676",
  },
  color: 'white',
  border: 0,
  borderRadious: 3,
  height: 36,
  padding: '0 8px 0 8px',
  boxShadow: '0 3px 5px 2px #b8000084',
})

const StartButton = styled(Button)({
  background: '#5e80f0FF',
  '&:hover': {
    background: "#7695fc",
  },
  color: 'white',
  border: 0,
  borderRadious: 3,
  height: 36,
  padding: '0 8px 0 8px',
  boxShadow: '0 3px 5px 2px #003ab85e',
})

const AmountButton = styled(Button)({
  color: 'gray',
  border: 0,
  borderRadious: 3,
  height: 36,
  width: 10,
  marginLeft: '8px',
  marginRight: '8px',
  padding: '0 2px 0 2px',
  fontSize: '24px'
})

const HomeContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '450px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  border: '1px solid #646464',
  background: '#ebebeb',
  marginTop: '24px'
})

const TextBox = styled(Box)({
  display: 'flex',
  borderRadious: 2,
  borderSize: '1',
  fontSize: '24px',
  maxWidth: '250px',
  paddingTop: '50px',
  paddingBottom: '20px',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'center'
})

const ButtonBox = styled(Box)({
  display: 'flex',
  maxWidth: '200px',
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: '24px'
})


export function SetQuestions() {
  const { setValue, storedForm } = useContext(QuestionsContext)

  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCounter = (value: number) => {
    if (value < 0) {
      return null;
    }
    else {
      setCount(value)
    }
  }

  return (
    <HomeContainer>
      <TextBox>Adjust the number of questions and hit Start!</TextBox>
      <ButtonBox>
        <CancelButton onClick={() => setCount(0)}>Cancel</CancelButton>
        <AmountButton type="button" onClick={() => handleCounter(count - 1)}>-</AmountButton>
        <span>{count}</span>
        <AmountButton type="button" onClick={() => handleCounter(count + 1)}>+</AmountButton>
        <StartButton type="submit" onClick={() => setValue(count)}>Start</StartButton>
      </ButtonBox>
      { storedForm
        ? <Box paddingBottom={2}>
          <Button onClick={handleOpen}>Check your last Score!</Button>
          <Modal
            open={open}
            onClose={handleClose}>
            <QuestionsReport />
          </Modal>
        </Box>
        : null}
    </HomeContainer>
  )
}