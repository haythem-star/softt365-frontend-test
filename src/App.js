import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Amortissements from "./components/amortissements/Amortissements";
import Form from "./components/form/Form";
import { useState } from "react";

function App() {
  const [amortissements, setAmortissements] = useState([]);
  const handleAmortissements = (data) => {
    setAmortissements(() => [...data]);
  };
  return (
    <div className="row g-3">
      <div className="col">
        <Form handleAmortissements={handleAmortissements} />
      </div>
      <div className="col">
        <Amortissements amortissements={amortissements} />
      </div>
    </div>
  );
}

export default App;
