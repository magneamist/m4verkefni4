import { useCatFact } from "../UseCatFact";

function FunFact() {
  const { funFact, fetchFact } = useCatFact();

  return (
    <div>
      <h2>Fun Fact!</h2>
      <h3>{funFact}</h3>
      <button onClick={fetchFact}>New fact</button>
    </div>
  );
}

export default FunFact;
