import React from "react";
import { useState } from "react";
import axios from "axios";
import Emprunt from "../emprunt/Emprunt";

export default function Form({ handleAmortissements }) {
  const [bool, setBool] = useState(false);
  const [fraisAchat, setFraisAchat] = useState("");
  const [emprunter, setEmprunter] = useState("");
  const [montantAchat, setMontantAchat] = useState("");
  const [fondsPropres, setFondsPropres] = useState("");
  const [duree, setDuree] = useState("");
  const [tauxAnnuel, setTauxAnnuel] = useState("");

  const handleCalculateForm = async (e) => {
    e.preventDefault();
    if (
      montantAchat != "" &&
      fondsPropres != "" &&
      duree != "" &&
      tauxAnnuel != ""
    ) {
      axios
        .post("http://localhost:8080/gestionFond/calculate", {
          tauxAnnuel: tauxAnnuel,
          montantAchat: montantAchat,
          fondsPropres: fondsPropres,
          duree: duree,
        })
        .then((response) => {
          setBool(true);
          setFraisAchat(response.data.fraisAchat);
          setEmprunter(response.data.amortissements[0].soldeDebut);
          handleAmortissements(response.data.amortissements);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <form style={{ margin: "20px" }} onSubmit={handleCalculateForm}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="montantAchat">Montant d'achat</label>
            <input
              value={montantAchat}
              onChange={(event) => {
                setMontantAchat(event.target.value);
              }}
              className="form-control"
              id="montantAchat"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="fondsPropres">Fonds propres</label>
            <input
              value={fondsPropres}
              onChange={(event) => {
                setFondsPropres(event.target.value);
              }}
              className="form-control"
              id="fondsPropres"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="durée_de_credit">durée de credit</label>
            <input
              className="form-control"
              value={duree}
              onChange={(event) => {
                setDuree(event.target.value);
              }}
              id="durée_de_credit"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="tauxAnnuel">Taux Annuel</label>
            <input
              className="form-control"
              value={tauxAnnuel}
              onChange={(event) => {
                setTauxAnnuel(event.target.value);
              }}
              id="tauxAnnuel"
            />
          </div>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Calculate
        </button>
      </form>
      {bool && (
        <Emprunt
          emprunter={emprunter}
          fraisAchat={fraisAchat}
          fondsPropres={fondsPropres}
          montantAchat={montantAchat}
        />
      )}
    </>
  );
}
