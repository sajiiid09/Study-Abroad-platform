const DocumentsTab = () => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-3">
      <h2 className="font-display text-xl font-semibold text-foreground">Documents</h2>
      <p className="text-muted-foreground">
        In a real system, you would upload your Passport, IELTS scorecard, academic transcripts, and other supporting
        documents here. For this demo, uploads are disabled.
      </p>
      <button
        className="px-4 py-2 rounded-lg bg-secondary text-muted-foreground cursor-not-allowed"
        disabled
      >
        Upload coming soon
      </button>
    </div>
  );
};

export default DocumentsTab;
