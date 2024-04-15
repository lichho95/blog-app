const Spinner = () => (
  <div className="text-center mt-5 mb-5" data-testid='loading-spinner'>
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Spinner;
