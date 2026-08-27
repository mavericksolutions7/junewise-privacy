# Four Nights in Nashville — deploy notes

A single self-contained static page: the Labor Day weekend itinerary for
Sam, Erin, Ben, E and Andrew. September 3–7, 2026.

## What's here

| File | Purpose |
| --- | --- |
| `index.html` | The whole site. No build step, no dependencies, no external assets except Google Fonts. |
| `vercel.json` | Static config — clean URLs and a couple of sensible headers. |
| `scripts/build-artifact.mjs` | Regenerates the Claude Artifact copy from `index.html` so the two versions can't drift. |

Note that this branch adds a root `index.html` to a repo that otherwise
only holds the June Wise privacy policy. Deploying this branch serves the
itinerary at `/`. If the itinerary should live at a path instead, move
`index.html` into a subdirectory and the URL follows it.

## Deploying on Vercel

The page is plain static HTML, so there is no framework, build command, or
output directory to configure.

**From the dashboard**

1. Go to <https://vercel.com/new> and import `mavericksolutions7/junewise-privacy`.
2. Framework preset: **Other**. Leave build command and output directory empty.
3. Set the production branch to `claude/labor-day-itinerary-site-dvzyum`
   (Project → Settings → Git), or merge the branch to `main` first.
4. Deploy.

**From the CLI**

```bash
npx vercel --prod
```

Every push to the branch redeploys.

## Editing

Everything is in `index.html` — copy, styles and script in one file.

- Itinerary entries are `.blk` elements grouped inside `.day` articles.
- `data-who="sam erin ben"` on a block controls who it belongs to; that is
  what the persona filter reads.
- `.blk__mine` with `data-for="erin"` is a note shown only to that person.
- Anything still unconfirmed is wrapped in `<mark class="tbd">` and listed
  in the **Still To Lock** section. Keep those two in sync.

After editing, refresh the Artifact copy:

```bash
node scripts/build-artifact.mjs   # writes dist/artifact.html
```
