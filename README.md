# Promote make.fun's make-your-own-bounty post on X

Entry for `post-x-promote-make-your-own-bounty-01` ($250, top 50 share it).

The entry is one post on X from @0xfyc quoting make.fun's post
(https://x.com/makefunai/status/2124915864336236646), with a photo of its
own attached (see `photo.png` in the work directory — the image the post
carries), make.fun / @makefunai and our play code in its text. Places go by
the post's score: replies + reposts + quotes at the deadline.

- `main.ts` — copies `POST.json` to the output directory. That is all it
  does. It refuses a placeholder address (exit 1), so only a real post URL
  can be submitted.
- `POST.json` — the post's address. Placeholder until the user posts from
  their phone; the parent swaps in the real URL before submitting.
- `caption.txt` (work directory) — the exact caption text for the post.
- `photo.png` (work directory) — the photo attached to the post: a golden
  bounty board with task cards and three robot agents racing toward it,
  headline "MAKE YOUR OWN BOUNTY".

## Run locally

```sh
mkdir -p out && node main.ts out   # writes out/POST.json
```
