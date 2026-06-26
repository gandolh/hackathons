# TP-02 — Upload Flow

Run setup & fixtures: [playwright/README.md](../../playwright/README.md).

## Goal

Verify the upload screen renders correctly, accepts a file, shows loading state, calls the API, and navigates to the dashboard on success.

## Cases

1. **Upload screen renders** — After login, confirm `/` shows: brand wordmark, dashed dropzone, "Select File Manually" button (disabled), privacy footer.
2. **File select via click** — Click the dropzone (or button), pick `playwright/fixtures/sample-chat.txt`. Dropzone should switch to file-selected state: filename, file size, remove ×.
3. **Remove file** — Click the × button. Dropzone should return to empty state; CTA button should be disabled again.
4. **Analyze Chat button enabled** — With a file selected, "Select File Manually" button text should change to "Analyze Chat" and be enabled.
5. **Loading state during upload** — Click "Analyze Chat". The dropzone should show spinner + "Analyzing your yapping…" text during the async call. Screenshot this transient state.
6. **Successful round-trip** — After the mutation resolves, localStorage should contain a `convId` key, and the page should navigate to `/dashboard`.
7. **API ownership** — Call `GET /api/<convId>` directly with the same JWT; confirm the response is valid DashboardData JSON.
8. **Upload error display** — Simulate a failure (stop the BE, try to upload). The upload error message should appear below the button.

## Pass criteria

File state machine transitions (empty → selected → loading → done) are all visually correct. API round-trip stores a real convId. Error message appears without crashing.
