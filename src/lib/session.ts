const LAST_RESULT_ID = "participant_result_id";

/** Remember which result the user last saw, so pages can navigate back to it. */
export function rememberResultId(id: string) {
  if (id) sessionStorage.setItem(LAST_RESULT_ID, id);
}

export function getLastResultId(): string | null {
  return sessionStorage.getItem(LAST_RESULT_ID);
}
