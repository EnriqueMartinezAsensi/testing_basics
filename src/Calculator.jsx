import { useState } from "react";
import { chain } from "mathjs";

const rows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0, "."]];
export const operations = ["+", "-", "*", "/"];
export const specialFunctions = ["C", "CE", "+/-", "<"];
export const equalSign = "=";

const operatObject = {
  "+": (op1, op2) => {
    return chain(op1).add(op2).done();
  },
  "-": (op1, op2) => {
    return chain(op1).subtract(op2).done();
  },
  "*": (op1, op2) => {
    return chain(op1).multiply(op2).done();
  },
  "/": (op1, op2) => {
    return chain(op1).divide(op2).done();
  }
};

export const Calculator = () => {
  const [currentValue, setCurrentValue] = useState("");
  const [storedValue, setStoredValue] = useState("");
  const [nextOperation, setNextOperation] = useState();
  const [isStoringNeeded, setIsStoringNeeded] = useState(false);

  const handleClick = (subString) => () => {
    const keys = Object.keys(operatObject);
    if (keys.includes(subString)) {
      if (storedValue && currentValue) {
        const result = nextOperation(storedValue, currentValue);
        setCurrentValue(result);
      }
      const willOperate = operatObject[subString];
      setNextOperation(() => willOperate);
      setIsStoringNeeded(true);
    } else if (subString === "C") {
      setCurrentValue("");
    } else if (subString === "CE") {
      setCurrentValue("");
      setStoredValue("");
    } else if (subString === "+/-") {
      setCurrentValue(-currentValue);
    } else if (subString === "<") {
      if (currentValue !== "") {
        const length = currentValue.length;
        setCurrentValue(currentValue.substring(0, length - 1));
      }
    } else if (subString === equalSign) {
      const result = nextOperation(storedValue, currentValue);
      setCurrentValue(result);
      setStoredValue("");
      setIsStoringNeeded(true);
    } else {
      if (isStoringNeeded) {
        setStoredValue(currentValue);
        setCurrentValue(subString);
        setIsStoringNeeded(false);
      } else setCurrentValue(`${currentValue}${subString}`);
    }
  };

  return (
    <section>
      <h1>Calculator</h1>
      <input value={currentValue} readOnly />
      <div role='grid'>
        {rows.map((row, index) => (
          <div key={index} role='row'>
            {row.map((number) => (
              <button onClick={handleClick(number)} key={number}>
                {number}
              </button>
            ))}
          </div>
        ))}
        {operations.map((operation) => (
          <button key={operation} onClick={handleClick(operation)}>
            {operation}
          </button>
        ))}
      </div>
      <button key={equalSign} onClick={handleClick(equalSign)}>
        {equalSign}
      </button>
      {specialFunctions.map((cOperation) => (
        <button key={cOperation} onClick={handleClick(cOperation)}>
          {cOperation}
        </button>
      ))}
    </section>
  );
};
