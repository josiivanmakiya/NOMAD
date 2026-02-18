export default function DataCard({ term, mechanism, detail }) {
  return (
    <div className="dataCard">
      <p className="label valuesHeading">{term}</p>
      <p className="hint dataCardMechanism">{mechanism}</p>
      {detail ? <p className="hint">{detail}</p> : null}
    </div>
  );
}
