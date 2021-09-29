import "./App.css";
import { SetStateAction, useState } from "react";
import { createOperation, Operation, solveOperation } from "./models/operation";

enum Status {
  Success = "success",
  Error = "error",
  Unset = "unset",
}

const initialOperation: Operation = createOperation();

const App = () => {
  const [status, setStatus] = useState<Status>(Status.Unset);
  const [operation, setOperation] = useState<Operation>(initialOperation);
  const result = solveOperation(operation);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      // If "Enter" key is pressed
      const userAnswer = parseInt(inputValue); // Parse current input value as integer
      if (!isNaN(userAnswer)) {
        // Do nothing if input is empty, avoid validation by mistake
        if (status === Status.Unset) {
          // If status is not set yet, enter validation process
          const _status = userAnswer === result ? Status.Success : Status.Error; // Check if user has answered correctly or not
          setStatus(_status); // Set status consequently
          if (_status === Status.Success) {
            //
            setScore(score + 1);
          } else {
            setScore(score - 1);
          }
        } else {
          // If status is set, means that right answer is displayed, can pass to next question
          setInputValue("");
          setStatus(Status.Unset);
          setOperation(createOperation());
        }
      }
    }
  };

  return (
    <div className="app">
      <p>Deviens super balaise en calcul mental ! En t'amusant…</p>
      <p>Score : {score}</p>
      {operation && (
        <p>
          {operation.operand1} {operation.operator} {operation.operand2}
        </p>
      )}
      <p>
        <input
          className="user-answer"
          placeholder="?"
          type="text"
          autoFocus
          onKeyPress={handleKeyPress}
          value={inputValue}
          onChange={handleChange}
        />
      </p>
      <p>
        {status === Status.Success
          ? "✅ Bonne réponse !"
          : status === Status.Error
          ? "❌ Presque ! La bonne réponse était " + result
          : ""}
      </p>
    </div>
  );
};

export default App;
