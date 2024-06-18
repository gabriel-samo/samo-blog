import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [response, setResponse] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/test")
      .then((res) => {
        console.log(res);
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);
        setResponse(err.message);
      });
  }, []);

  return (
    <div className="App">
      <h1>HELLO</h1>
      <p>Response form server: {response}</p>
    </div>
  );
}

export default App;
