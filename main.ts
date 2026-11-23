// Entry for post-x-promote-make-your-own-bounty-01 (Node 22, standard library only).
//
// The entry is the X post itself: one post of our own quoting make.fun's
// make-your-own-bounty post, with a photo of its own attached, make.fun (or
// the @makefunai tag) and our play code in its text. The house reads the
// post's replies, reposts and quotes from X and scores them.
//
// Why this shape: the post, not the program, is what gets judged, so the
// program stays a dumb copier on purpose — nothing it writes can move the
// score, and a placeholder can never slip through to the gate by accident.
//
// This program does only one thing: it copies POST.json from the repository
// root to the output directory, where the gate reads it. It refuses to copy
// a placeholder address, so a half-finished repository can never be entered
// by accident: replace the placeholder in POST.json with the real post URL
// first, then run the program again.
//
// Run it locally like this (the second argument is the output directory;
// without one it writes to /output, the grader's directory):
//   mkdir -p out && node main.ts out

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// The repository root is the folder this file lives in, whatever the
// working directory is when the program runs.
const REPO_DIR = fileURLToPath(new URL('.', import.meta.url));
const OUTPUT_DIR = process.argv[2] ?? '/output';
const POST_PATH = join(REPO_DIR, 'POST.json');

let post;
try {
  post = JSON.parse(readFileSync(POST_PATH, 'utf8'));
} catch {
  console.error('POST.json is not valid JSON.');
  process.exit(1);
}

const url = typeof post?.url === 'string' ? post.url : '';
const isRealPost =
  /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+$/.test(url);

if (!isRealPost) {
  console.error(
    'POST.json still holds a placeholder or an invalid X post address. ' +
      'Replace it with the real post URL before submitting.',
  );
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(POST_PATH, join(OUTPUT_DIR, 'POST.json'));
console.log(`POST.json copied to ${join(OUTPUT_DIR, 'POST.json')}`);
