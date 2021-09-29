import "./App.css";
import { SetStateAction, useState } from "react";
import { createOperation, Operation, solveOperation } from "./models/operation";

type Status = "success" | "error" | undefined;

const initialOperation: Operation = createOperation();

const App = () => {
  const [status, setStatus] = useState<Status>(undefined);
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
      if (status === undefined) {
        const value = parseInt(inputValue);
        const _status = value === result ? "success" : "error";
        setStatus(_status);
        if (_status === "success") {
          setScore(score + 1);
        } else {
          setScore(score - 1);
        }
      } else {
        setInputValue("");
        setStatus(undefined);
        setOperation(createOperation());
      }
    }
  };

  return (
    <div className="App">
      <p>Deviens super balaise en calcul mental ! En t'amusant…</p>
      <p>Score : {score}</p>
      {operation && (
        <p>
          {operation.operand1} {operation.operator} {operation.operand2}
        </p>
      )}
      <p>
        <input
          type="text"
          autoFocus
          onKeyPress={handleKeyPress}
          value={inputValue}
          onChange={handleChange}
        />
      </p>
      <p>
        {status === "success"
          ? "✅ Bonne réponse !"
          : status === "error"
          ? "❌ Presque ! La bonne réponse était " + result
          : ""}
      </p>
    </div>
  );
};

export default App;
