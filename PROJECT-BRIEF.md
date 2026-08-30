# Project brief — "The Nashville Labor Day Gang"

A handoff document for whoever picks this up next. It covers what the project
is, every fact the page asserts, the design system, the interaction model, how
to verify changes, and how to deploy. Read it before editing `index.html`.

---

## 1. What this is

A single-page, shareable itinerary site for a family Labor Day weekend in
Nashville: **Thursday 3 – Monday 7 September 2026**. Five guests travel in,
three hosts are already there. The page is a one-stop shop — arrival times,
day-by-day plan, venue addresses and phone numbers, local tips, packing
checklists, and an explicit list of what is still unconfirmed.

The goal is that nobody has to ask a question that the page could have
answered, and that anyone can open it on a phone and immediately see what
*they* are doing.

**Live Vercel target:** https://i-have-a-static-single-page.vercel.app/ See §9.

---

## 2. Repository and files

**Repo:** `mavericksolutions7/junewise-privacy`
**Branch:** `claude/labor-day-itinerary-site-dvzyum`

| Path | Bytes | Purpose |
| --- | --- | --- |
| `index.html` | ~98 KB | **The entire site.** Markup, CSS and JS in one file. No dependencies, no build step. |
| `vercel.json` | 563 | Static config: `cleanUrls`, `nosniff`, `Referrer-Policy`, noindex headers, and no-cache on `index.html`. |
| `scripts/build-artifact.mjs` | 1.7 KB | Strips the `<!doctype>/<html>/<head>/<body>` wrapper to produce `dist/artifact.html` for publishing as a Claude Artifact. Run `node scripts/build-artifact.mjs`. |
| `DEPLOY.md` | 2 KB | Deploy and editing notes. |
| `.gitignore` | — | `dist/`, `node_modules/`, `.vercel/` |
| `dist/artifact.html` | ~97 KB | Build output. Gitignored. |
| `README.md` | 5.6 KB | **Unrelated — the June Wise privacy policy. Do not modify or delete.** |

### Important repo caveat

This repo was originally created to hold an unrelated privacy policy. The
itinerary site was added to it only because no better repo was available. The
root `index.html` means a Vercel deploy of this branch serves the itinerary at
`/`. If you would rather this live somewhere sensible, moving it to a dedicated
repo is encouraged — nothing here depends on this repo's history.

### Commit history on the branch

```
95acc8c Add the house address and set Saturday night at Printers Alley
cc01766 Set pickleball at Dinkville Under Broad
17c69cc Add Friday padel at Sensa
725e619 Confirm golf and dinner; add Andrew's Peoria drive
34ca3e0 Add Hannah and Bruce as hosts; lock E's flights and the Chicago drive
19a0fcd Add Labor Day weekend itinerary site
```

---

## 3. Stack and hard constraints

- **Vanilla HTML + CSS + JS in one file.** No framework, no bundler, no npm
  dependencies, no build step for the site itself.
- **Fully self-contained.** The only external requests are Google Fonts. No CDN
  scripts, no remote images. This is deliberate: it lets the same file work as a
  Vercel deploy, a Claude Artifact, a Netlify drop, or a local file opened from
  disk.
- **No horizontal page scroll at any width.** Verified in the harness (§8).
- **Both colour schemes must work.** Light and dark are equally designed, not an
  afterthought.
- **`prefers-reduced-motion` respected** on every animation.
- **All `localStorage` access wrapped in `try/catch`** — it throws in some
  private-browsing contexts, and the page must render correctly with no stored
  state.

If you rewrite this in a framework, you lose the "one file that works
everywhere" property. That is a real cost; make the call deliberately.

---

## 4. Design system

### Concept

**Hatch Show Print letterpress gig poster.** Hatch is the 140-year-old
letterpress poster shop on Broadway in Nashville — it is the city's actual
native design language, which is why it was chosen over a generic travel-page
look. The weekend is billed like a concert tour: *The Nashville Labor Day Gang*,
one weekend only, load-in times, a routing sheet, a rider.

The hero is a centred broadside because that is what a gig poster is.
**Everything below the hero is left-aligned** and reads like a tour routing
sheet. That contrast is intentional — do not centre the body content.

### Colour tokens

Semantic, not decorative. Red is the brand ink; teal and gold carry meaning.

| Token | Light | Dark | Meaning |
| --- | --- | --- | --- |
| `--ink` | `#191510` | `#f0e7d3` | Body text (warm near-black, not neutral) |
| `--ink-soft` | `#4a4136` | `#c4b8a0` | Secondary text |
| `--ink-faint` | `#7d7263` | `#8e836e` | Tertiary / labels |
| `--stock` | `#ede4d0` | `#14110d` | Page ground (poster stock / ink) |
| `--stock-2` / `--stock-3` | `#e4d9c1` / `#d8cbae` | `#1c1813` / `#262019` | Layered grounds |
| `--rule` | `#c3b79a` | `#443b2e` | Hairlines, inactive borders |
| `--red` | `#c43a2b` | `#e8614c` | **Primary ink.** Brand, emphasis, active state |
| `--red-deep` | `#9c2c20` | `#f08670` | Red variant |
| `--teal` | `#1f6f63` | `#4bb8a3` | **Confirmed / locked.** Also Bruce (not a person) |
| `--gold` | `#b5811a` | `#e6b34a` | **Unconfirmed.** Chips and highlighter marks |
| `--gold-mark` | `rgba(224,165,38,.38)` | `rgba(230,179,74,.26)` | `mark.tbd` highlighter fill |
| `--card` / `--card-2` | `#f4ecda` / `#e9dfc7` | `#1e1a14` / `#262019` | Card grounds |

**The colour semantics are load-bearing.** Anything unconfirmed is wrapped in
`<mark class="tbd">` (gold highlighter) and carries a `chip--open` badge.
Anything booked carries `chip--locked` (teal). Keep these in sync with the
**Still To Lock** section — if you confirm a fact, remove its mark, flip its
chip, and delete its lock entry in the same edit.

### Theming mechanism (three states)

```css
:root { /* full light palette — the base */ }

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { /* dark overrides */ }
}

:root[data-theme="dark"] { /* dark overrides again, so the toggle wins */ }
```

Never define a colour only inside a media or `[data-theme]` block. The manual
toggle writes `data-theme` on `<html>` and persists to `localStorage` under
`fnn:theme`.

### Typography

Four families, one Google Fonts request:

| Role | Family | Used for |
| --- | --- | --- |
| Display | **Alfa Slab One** | Fat wood-type poster lines, section headings, venue names |
| Poster caps | **Barlow Condensed** (500/600/700) | Bill lines, block titles, buttons, nav |
| Body | **Karla** (400/500/700 + italic) | All running text |
| Data | **IBM Plex Mono** (400/500/600) | Times, addresses, labels, chips, countdown |

Every stack has a real fallback. All times and numbers use
`font-variant-numeric: tabular-nums`. Headings use `text-wrap: balance`,
body copy `text-wrap: pretty`.

**All poster type is fluid via `clamp()` and was tuned against real renders at
390 px and 1280 px.** If you change a `clamp()` on `.l-title`, `.l-names`,
`.l-sub`, `.l-dates` or `.l-eyebrow`, re-run the harness at 390 px — these
overflow easily.

### Signature details (keep these)

- **Ink misregistration.** `.l-title` has two absolutely-positioned `.plate`
  spans behind the real text, in teal and red. They start far off-register and
  settle to a small permanent offset 420 ms after load. **Offsets are in `em`,
  not `px`, so they scale with the type** — px offsets turn to mud at mobile
  sizes. They never fully register; the residual fringe is the whole point.
- **Paper grain.** Inline SVG `feTurbulence` data URI on `.poster::after`,
  `multiply` in light, `screen` in dark.
- **Hard shadows.** Offset solid colour, zero blur (`box-shadow: 4px 4px 0`).
  Letterpress, not Material.
- **Nav/section anchoring.** `section { scroll-margin-top: 3.75rem }` so the
  sticky nav does not cover headings on anchor jumps.
- `z-index` scale is fixed: `--z-nav: 50`, `--z-top: 90`. No arbitrary values.

---

## 5. Content — every fact the page asserts

Treat this as the source of truth. If you change a fact, grep for every place
it appears; several are stated in a day block, a venue card, the rider, and the
lock list.

### People (9 personas)

| Person | Role | Travel | Working |
| --- | --- | --- | --- |
| **E** (Elizabeth Mather) | Guest | Flies from **Chicago via MDW at 8:00 AM Thu**, lands BNA **~9:20 AM** (~1h20, no time change). Home **6:40 PM Mon** from BNA, leave house ~4:15 PM. **Confirmed.** | — |
| **Sam** | Guest | Drives from Chicago with Erin and Ben. Arrives **Thu 10 PM – 12 AM**. | **Half day Fri, 9 AM – 1 PM** |
| **Erin** | Guest | Same drive. | **Full day Fri, 9 AM – 5 PM.** Misses padel. |
| **Ben** | Guest | Same drive. | None |
| **Andrew** | Guest | Drives from **Peoria, IL** — 445 miles, ~6½ hours via I-24. **Unresolved:** stated noon arrival requires a 5:30 AM departure. | None |
| **Collin** | Saturday guest | Joins the Saturday pickleball run at Dinkville; broader weekend availability not specified. | — |
| **Will Mather** | Host | Already there | — |
| **Hannah Mather** | Host | Already there | — |
| **Bruce Mather** | **The dog** | Never leaves | — |

**Meal headcount is 7** (five guests plus Will and Hannah). Collin is currently
added to Saturday pickleball only, so the Pelato and Friday dinner headcounts do
not change. Bruce does not go to restaurants. This number appears in the Pelato
booking and the route notes.

### Home base

**710 Buchanan St, Unit 5, Nashville, TN 37208** — Buchanan Arts District, just
north of Germantown. The unit number is retained in this internal brief only;
the public page intentionally shows the street address without the unit.
**Not in Germantown**, which an earlier draft wrongly assumed; several
walkability claims had to be corrected. Distances used:

- ~1 mile to the Germantown restaurant row — 15–20 min walk, ~5 min drive
- ~20 min from BNA airport
- ~10 min to Dinkville
- ~30 min to Franklin Bridge Golf Club

All distances on the page are stated **from the house**, not from Germantown.

### Venues

| Venue | Address / contact | Status |
| --- | --- | --- |
| **Sensa Padel** | 1312 Adams St, Neuhoff, Germantown · (615) 720-9968 · 6 outdoor courts · **4 players per court** · off-peak M–F 7am–5pm | **Not booked.** Will's to make |
| **Jack Brown’s Beer & Burger Joint** | 1123 3rd Ave N, Germantown · (615) 928-6774 · daily 11:00 AM–2:00 AM | Friday dinner, kept casual and close to the house |
| **Dinkville Under Broad** | Nashville Yards, beneath the Broad St railway overpass · (615) 910-3449 · 5 courts, **covered** · 9 holes mini golf · book via app/site/phone | **Confirmed — 2 courts reserved, noon–2:00 PM Saturday** |
| **Pelato** | 1300 3rd Ave N, Germantown · Brooklyn-Italian small plates, Scotto family (also run Luogo) | **Booked — 5:00 PM, table for 7** |
| **Franklin Bridge Golf Club** | 750 Riverview Dr, Franklin TN 37064 · (615) 794-9400 | **Confirmed — 9:00 AM Sunday** |
| **Printers Alley** | Between 3rd & 4th Ave N, off Church St, downtown | Friday post-dinner walk, before the optional Broadway stop |
| **Ole Red / The Lookout** | 300 Broadway, downtown · live music and rooftop · no reservations · 21+ after 9:00 PM | One-stop “soft Broadway” option if the group still wants more after the Alley |
| **Mother's Ruin / Sonny's / Streetcar** | Germantown | Saturday after Pelato, route intentionally loose |
| **Capitol Mall / Farmers' Market** | Bicentennial Capitol Mall State Park; Nashville Farmers' Market, 900 Rosa L. Parks Blvd, free parking | Saturday walk destination |

**Note:** the old Dinkville rooftop court at the Bobby Hotel is **permanently
closed**. The page says so, because people will remember it.

### The itinerary

**THU 3 SEP — Load-in**
- `~9:20 AM` E flies in from Chicago and lands (8:00 AM MDW departure) — confirmed
- `10 PM – 12 AM` Chicago crew drives in — ~470 mi down I-65, ~7 hrs. Departure time TBD
- Late — nothing planned. Kitchens are shut; downtown serves late

**FRI 4 SEP — Padel, burgers, then downtown**
- `9 AM – 5 PM` Erin working, full day
- `9 AM – 1 PM` Sam working, half day
- `~12 PM or later` Andrew arrives (see the 5:30 AM problem)
- `~1:30 PM` **Padel at Sensa.** 1:30 rather than noon is what lets Sam play
- Afternoon open
- `~6:00 PM` **Jack Brown’s Beer & Burger Joint** in Germantown. Easy burgers,
  cold beer, and no need to turn dinner into another production
- After dinner, walk or rideshare downtown to **Printers Alley**
- If the group still has gas, make one controlled Broadway appearance at
  **Ole Red / The Lookout**, then rideshare home. This is a taste of Broadway,
  not a full crawl

**SAT 5 SEP — The big one**
- `~8:30 AM` Walk and coffee: Buchanan St → Germantown → Capitol Mall →
  Farmers' Market. ~1 hr round trip on foot; driving down to join at the market
  is offered. Coffee: Elegy, Steadfast, Barista Parlor. Bruce comes
- `12:00 – 2:00 PM` **Pickleball at Dinkville**, two courts reserved. Collin joins
  for the eight-player run. Take two cars and use **Nashville Yards Parking**; the
  covered courts are why a noon start works in September
- `5:00 PM` **Pelato**, seven seats
- After dinner, a loose Germantown mini crawl: **Mother's Ruin, Sonny's,
  Streetcar**, then leave one stop open for a wildcard

**SUN 6 SEP — Golf & grill**
- `7:30 AM` Leave the house. The only hard time all weekend
- `9:00 AM` **Franklin Bridge**, foursome: Will, Sam, Ben, Andrew
- Morning free for E, Erin, Hannah, Bruce
- Evening cookout at the house, then games

**MON 7 SEP — Load-out**
- Drive crew north, times TBD
- `~4:15 PM` leave for E's 6:40 PM flight

### Still open (6 items, mirrored in the page's "Still To Lock" section)

1. **Sensa padel** — what time, how many courts (4 per court, 6 people free after 1 PM)
2. **Collin** — is he joining Saturday dinner and the neighborhood crawl, or just pickleball?
3. **Andrew** — 5:30 AM start, or a normal one and a mid-afternoon arrival
4. **Chicago drive** — Thursday departure time
5. **Friday night** — decide at Printers Alley whether the group still wants the Ole Red stop
6. **Monday** — drive-crew departure times

---

## 6. Interaction model

### Persona filter — the centrepiece

Nine buttons in `#whoGrid`, each `data-person="<id>"` with `aria-pressed`.
Selecting one rewrites the whole itinerary around that person:

- Every `.blk` carries `data-who="sam erin ben"`. Blocks not matching get
  `.is-dim` — 34 % opacity, and every child except `.blk__title` is hidden, so
  irrelevant blocks collapse to a single line rather than shouting.
- `.blk__mine[data-for="erin"]` reveals a note written for that person only.
- `.tagp[data-p="erin"]` gains `.is-you` and turns red wherever they appear.
- A `#youBar` banner summarises their weekend in one sentence.
- Persisted to `localStorage` as `fnn:me`. Clicking the active person clears it.

**Invariant: if a person is in a block's `data-who`, they must also have a
`.tagp` chip in that block's `.blk__who` list**, otherwise the block lights up
for them but their name is not highlighted. This has broken twice.

### Everything else

| Feature | Detail | Storage key |
| --- | --- | --- |
| Countdown | To `2026-09-03T00:00:00-05:00` (CDT). 1 s interval, clears itself at zero, tabular-nums | — |
| Packing checklists | Three lists, per-item checkbox, reset button per list | `fnn:pack:<k>` |
| Theme toggle | Writes `data-theme` on `<html>` | `fnn:theme` |
| Nav highlight | `IntersectionObserver`, `rootMargin: "-25% 0px -65% 0px"` | — |

All storage reads and writes are in `try/catch`.

---

## 7. Editing conventions

- Itinerary entries are `.blk` elements inside `.day` articles.
- Block accent colours: `.blk--key` (red, the day's anchors), `.blk--work`
  (gold, someone is on the clock), `.blk--travel` (teal), plain (grey rule).
- Chips: `.chip--locked` (teal, confirmed), `.chip--open` (gold, outstanding),
  `.chip--work` (red).
- After editing, regenerate the Artifact copy: `node scripts/build-artifact.mjs`.

---

## 8. Verification harness

There is no test suite. Changes were verified by rendering in headless Chromium
and looking at the result. Chromium and Playwright are available globally in the
dev container.

```bash
npx http-server -p 8099 -s .    # serve the repo root
node shot.mjs                   # render and screenshot
```

```js
// shot.mjs
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';

const URL = 'http://127.0.0.1:8099/index.html';
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});
const errors = [];

async function shot(name, opts) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push(`${name}: PAGEERROR ${e.message}`));
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 1) errors.push(`${name}: HORIZONTAL OVERFLOW ${overflow}px`);

  const fonts = await page.evaluate(() => ({
    alfa: document.fonts.check('16px "Alfa Slab One"'),
    barlow: document.fonts.check('16px "Barlow Condensed"'),
    karla: document.fonts.check('16px "Karla"'),
    plex: document.fonts.check('16px "IBM Plex Mono"'),
  }));
  console.log(name, JSON.stringify(fonts), 'overflow:', overflow);

  await page.screenshot({ path: `shots/${name}-full.png`, fullPage: true });
  await ctx.close();
}

await shot('light',  { viewport: { width: 1280, height: 900 }, colorScheme: 'light' });
await shot('dark',   { viewport: { width: 1280, height: 900 }, colorScheme: 'dark' });
await shot('mobile', { viewport: { width: 390,  height: 844 }, colorScheme: 'light' });

console.log(errors.length ? 'ISSUES:\n' + errors.join('\n') : 'clean');
await browser.close();
```

**Check on every change:** zero horizontal overflow at 390 px and 1280 px, all
four fonts loaded, no page errors, both colour schemes legible, and the persona
filter still dims and reveals correctly (click a `.who` button and screenshot a
`.day`).

---

## 9. Deploying to Vercel

Deployed to the live alias at `https://i-have-a-static-single-page.vercel.app/`.
It is plain static HTML, so there is no framework, build command, or output
directory to configure. This section documents the rerun procedure; a deploy
receipt belongs in the handoff for each release.

**Dashboard:**
1. vercel.com/new → import `mavericksolutions7/junewise-privacy`
2. Framework preset **Other**; leave build command and output directory empty
3. Settings → Git → production branch `claude/labor-day-itinerary-site-dvzyum`
   (or merge to `main` first)
4. Deploy, then rename the project to control the subdomain

**CLI:** `npx vercel --prod` from the repo root.

**Privacy note:** the page carries the home street address alongside a schedule
showing when the house is empty (Sunday 7:30 AM, everyone leaves for golf).
The public page intentionally omits the unit number. `noindex`, `robots.txt`,
and `X-Robots-Tag` reduce discovery but are not authentication; Vercel
password protection would be a separate access-control decision.

---

## 10. Where to take it next

Ideas, roughly in value order. Items marked implemented are already on the page.

1. **Shared live state.** The single biggest upgrade: let people RSVP to
   individual blocks, vote on the Friday/Saturday route, or tick off the shopping
   list so everyone sees it. Currently all state is per-device `localStorage`.
   Needs a backend or a hosted form service.
2. **"Add to calendar" polish.** Implemented client-side in `index.html` for
   the weekend and eligible blocks; the next improvement would be a small
   import/share usability pass.
3. **Live weather** for the weekend, replacing the static "upper 80s and humid"
   seasonal note. Needs an API and would break the no-external-requests rule —
   decide whether that is worth it.
4. **A real map.** Every venue has an address; an inline map with the seven pins
   would beat seven separate Google Maps links.
5. **Drive tracker.** Two carloads are driving 445 and 470 miles. A shared "we
   are three hours out" would earn its place on Thursday.
6. **Photo wall** for after the weekend, so the page has a second life.
7. **Print stylesheet.** It is already a poster; one page that prints cleanly
   and sticks on the fridge is a small job.
8. **Accessibility pass.** Focus states, chip contrast in both themes, and a
   screen-reader run over the persona filter, which is the most complex control.
