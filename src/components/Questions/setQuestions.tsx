import { Box, Button} from "@material-ui/core";
import { useContext, useState } from "react";
import { QuestionsContext } from "../../context/QuestionsContext";

export function SetQuestions() {
  const questions = useContext(QuestionsContext)

  const [count, setCount] = useState(0)

  const handleCounter = (value: number) => {
    if (value < 0) {
      return null;
    }
    else {
      setCount(value)
    }
  }

  return (
    <Box>
        <Button onClick={() => setCount(0)}>Cancel</Button>
        <Button type="button" color="inherit" onClick={() => handleCounter(count - 1)}>-</Button>
        <span>{count}</span> 
        <Button type="button" color="primary" onClick={() => handleCounter(count + 1)}>+</Button>
        <Button type="submit" onClick={() => questions.setValue(count)}>Start</Button>
    </Box>
  )
}