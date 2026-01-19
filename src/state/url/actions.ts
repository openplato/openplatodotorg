import { ShowState } from "../../types";
import type { UrlState } from "./types";

/**
 * Build a URL from base URL and state
 */
export function buildUrl(baseUrl: URL, state: UrlState): URL {
  const url = new URL(baseUrl.href);
  const params = url.searchParams;

  // Clear existing state params
  params.delete("ref");
  params.delete("show");
  params.delete("comment");
  params.delete("panel");

  // Set ref
  if (state.ref) {
    params.set("ref", state.ref);
  }

  // Set show params (multiple values)
  // Don't add params if in first read mode (default state)
  if (!state.show.includes(ShowState.FIRST_READ)) {
    for (const s of state.show) {
      params.append("show", s);
    }
  }

  // Set comment (comma-separated)
  if (state.comment.length > 0) {
    params.set("comment", state.comment.join(","));
  }

  // Set panel
  if (state.panel === "pinned") {
    params.set("panel", "pinned");
  }

  url.search = params.toString();
  return url;
}

/**
 * Build URL string from current location and state
 */
export function buildUrlFromState(state: UrlState): string {
  return buildUrl(new URL(window.location.href), state).href;
}
