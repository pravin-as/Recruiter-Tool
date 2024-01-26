import React, { useState } from "react";
import CandidateList from "./components/CandidateList";
import CandidateForm from "./components/CandidateForm";

const App = () => {
  const [shouldRefreshList, setShouldRefreshList] = useState(false);
  const [candidateToEdit, setCandidateToEdit] = useState(null);

  const handleFormSubmit = () => {
    setShouldRefreshList(!shouldRefreshList);
    setCandidateToEdit(null);
  };

  const handleEditCandidate = (candidate) => {
    console.log("Editing candidate:", candidate);
    setCandidateToEdit(candidate);
  };

  return (
    <div>
      <CandidateForm
        onFormSubmit={handleFormSubmit}
        candidateToEdit={candidateToEdit}
      />
      <CandidateList
        onEditCandidate={handleEditCandidate}
        key={shouldRefreshList}
      />
    </div>
  );
};

export default App;
