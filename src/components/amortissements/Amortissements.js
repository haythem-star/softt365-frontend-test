import React from "react";
import "./Amortissements.css";

export default function Amortissements({ amortissements }) {
  return (
    <>
      <h1>Tableau d'amortissements</h1>
      <table id="customers">
        <tbody>
          <tr>
            <th>Periode</th>
            <th>Solde Debut</th>
            <th>Mensualité</th>
            <th>Intérêt</th>
            <th>Capital remboursé</th>
            <th>Solde fin</th>
          </tr>
          {amortissements.map((am) => {
            return (
              <tr key={am.periode}>
                <td>{am.periode}</td>
                <td>{am.soldeDebut}</td>
                <td>{am.mensualite}</td>
                <td>{am.interet}</td>
                <td>{am.capitalRembourse}</td>
                <td>{am.soldeFin}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
