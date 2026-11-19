export function Feedback({ error, message }) {
  if (error) return <p role="alert" className="feedback feedback-error">{error}</p>;
  if (message) return <p role="status" className="feedback feedback-success">{message}</p>;
  return null;
}

export function ResourceState({ data, error, refresh, children }) {
  return (
    <>
      {error && <div className="mb-4 space-y-2"><Feedback error={error} /><button className="btn-secondary" onClick={refresh}>Try again</button></div>}
      {data ? children : !error && <p className="card text-slate-500" role="status">Loading…</p>}
    </>
  );
}
