import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Emprunt({
  emprunter,
  fraisAchat,
  fondsPropres,
  montantAchat,
}) {
  const [capital, setCapital] = useState("");
  const [fonds, setFonds] = useState("");
  useEffect(() => {
    setCapital(emprunter);
    setFonds(fondsPropres);
  }, [emprunter, fondsPropres]);
  const handleEmprunterchange = (event) => {
    setCapital(event.target.value);
  };
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      axios
        .post("http://localhost:8080/gestionFond/fondsPropres", {
          emprunter: capital,
          montantAchat: montantAchat,
        })
        .then((response) => {
          setFonds(response.data.fonds);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [capital]);
  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th scope="col">champ</th>
          <th scope="col">montant</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>emprunter</td>
          <td>
            <input
              value={capital}
              className="form-control"
              onChange={handleEmprunterchange}
            />
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Fonds propres</td>
          <td>{fonds}</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Frais</td>
          <td>{fraisAchat}</td>
        </tr>
      </tbody>
    </table>
  );
}
