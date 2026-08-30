# Experience Specification: The Nashville Labor Day Gang

**Status:** implemented
**Owner:** Junewise family itinerary
**Surface:** `/` static itinerary page
**Updated:** 2026-08-27
**Source context:** `PROJECT-BRIEF.md`, the local poster system, and the design wiki guidance for user moment, motion purpose, responsive adaptation, content truth, and independent rendered review.

## 1. Product Moment

- **User:** A family member checking the weekend plan on a phone while travelling, working, or deciding what to bring.
- **Immediate job:** Find their own arrival, work, activity, meal, and departure line without asking the group.
- **Product outcome:** Less coordination friction and a shared sense of occasion.
- **Primary action:** Pick a name to filter the itinerary, then save or share the resulting view.
- **Costliest likely mistake:** Missing a hard time, confusing padel with pickleball, or treating an open item as booked.
- **One-second comprehension:** This is a four-night Nashville family run sheet, and the viewer can choose their line.
- **Emotional target:** A small, surprising feeling of being on the bill for a very good weekend.

## 2. Experience Thesis

The poster is the invitation; the routing sheet is the tool.

- **Signature moment:** Selecting a name turns the whole route into that person’s version, with their tags and notes pulled into focus.
- **Stable task moments:** Anchor navigation, exact times, confirmed versus open status, map/site links, calendar export, and packing checks remain predictable.
- **Peak moment:** The personalized banner plus a shareable filtered URL makes the page feel like it belongs to the viewer.
- **End state and next action:** Save the weekend or the relevant blocks, then send a personalized view or return to the full plan.
- **Effects that may be removed without harming the experience:** Ink registration, hover lift, and small button motion.

## 3. Information Hierarchy

| Priority | Element or message | User question answered | Required prominence |
| --- | --- | --- | --- |
| 1 | Weekend dates and selected-person route | What is this, and what am I doing? | Poster headline, first section action, active red state |
| 2 | Hard times and open/locked chips | What must I remember, and what is still unsettled? | Mono time rail, semantic colors, inline status |
| 3 | Calendar/share actions and supporting venue/rider detail | How do I carry this into the weekend? | Hero export, per-block save, lower-page detail |

Ambient: the countdown and poster grain. On demand: personal notes, calendar files, and map/site destinations. Never compete with the selected route: decorative motion, venue prose, and open-item detail stay secondary.

## 4. Composition and Regions

The hero is a centred broadside because the brief defines it as a gig poster. Below it, the sticky navigation and all sections are left-aligned routing-sheet content. The Band section ends with a contained, locally bundled band-poster figure after the picker and personal banner, before The Routing. It is a shared identity payoff, not a second hero or a replacement for the picker. The page scrolls naturally; only the navigation remains sticky. On narrow screens, itinerary blocks become a single time-over-content column, cards stack, the band poster stays uncropped at the available width, and hero actions become full-width without changing their order.

## 5. State and Transition Model

| State | Entry trigger | Visible hierarchy | Available action | System feedback | Exit or recovery |
| --- | --- | --- | --- | --- | --- |
| Initial | First load with no stored person | Poster, band picker, full itinerary | Pick a name, view route, save weekend | No hidden dependency for core content | Select a person or continue scrolling |
| Active | Click a person or open a shared `me` URL | Selected card, personal banner, relevant blocks, highlighted tags | Copy view, show everyone, save blocks | Dimming, reveal notes, URL update, polite status | Clear filter or choose another person |
| Success | Calendar or share action completes | Existing route remains stable | Import the downloaded file or send the copied URL | Status message names the completed action | Continue using the page |
| Error | Clipboard or download support is unavailable | Existing route remains usable | Retry or use the visible selected state | Honest status message; no false success | Keep selection local and continue |

Partial state is intentional: six open itinerary items use gold highlighter, gold open chips, and the lock list. Offline state keeps all core content and local checklist/person state available; Google Fonts may fall back.

## 6. Interaction Contract

| Interaction | Input methods | User purpose | Immediate feedback | Persistent result | Escape or undo |
| --- | --- | --- | --- | --- | --- |
| Pick a person | Pointer, touch, keyboard | See only one person’s route | `aria-pressed`, dimming, notes, tags, banner | `fnn:me` and `?me=` URL state | Click active person or Show everyone |
| Copy my view | Pointer, touch, keyboard | Share a filtered route without a backend | Status text confirms copy or explains failure | Clipboard only when available | No mutation to itinerary |
| Add weekend to calendar | Pointer, touch, keyboard | Carry the five-day plan into a calendar | Download status | `.ics` file | Delete/import control belongs to the calendar app |
| Save a block | Pointer, touch, keyboard | Carry a hard time or stated time marker | Download status | `.ics` file | Delete/import control belongs to the calendar app |
| Checklist item | Pointer, touch, keyboard | Track packing locally | Checkbox state and strikethrough | `fnn:pack:*` | Reset list |
| Theme toggle | Pointer, touch, keyboard | Read in preferred contrast mode | Palette changes | `fnn:theme` | Toggle again |

## 7. Motion Choreography

| Moment | Trigger | Property | Timing and easing | Purpose | Reduced-motion result |
| --- | --- | --- | --- | --- | --- |
| Ink registration | Page load | transform and opacity | 620ms settle after 420ms delay | Make the letterpress concept tangible | Plates begin in their settled offset with no transition |
| Button/card response | Hover or press | transform and box-shadow | 160ms ease-out | Confirm the target without delaying it | No transform |
| Filter change | Person selection | opacity and display state | 180ms opacity transition; structural reveal is immediate | Show what changed while keeping the route usable | Same state change without motion |

The one signature moment is ink registration. Filter motion is feedback, not spectacle. No looping animation, scroll hijack, or motion-dependent comprehension is required.

## 8. Responsive Transformations

| Concern | Mobile | Tablet | Desktop | Why it changes |
| --- | --- | --- | --- | --- |
| Hierarchy | Hero stays centred; action buttons stack; picker and route lead; at very narrow widths section slugs stack and countdown units stay on one row | Same order with more breathing room | Broadside has generous negative space; body remains left aligned | Preserve the poster read without making task actions tiny |
| Navigation | Horizontal scroll strip with 44px targets | Same | Full row with theme toggle at the edge | Keeps every anchor reachable without wrapping into a tall header |
| Primary action | Full-width Pick your line and calendar controls | Inline where space allows | Inline poster controls and per-block saves | Thumb-first access and no overflow |
| Supporting content | Cards and rider columns stack; time rail moves above body | Two-column cards where they fit | Grids and multi-column rider layout | Preserve scan order and readable measure |
| Band poster | Full-width within the wrap, natural square ratio, no face crop | Same | Left-aligned contained figure, max 42rem | Adds the shared identity moment without competing with the hero or picker |
| Media and motion | No external media; type remains fluid; no overflow | Same | Same | The artifact must work as a single self-contained page |

## 9. Accessibility and User Control

- **Keyboard order and focus behavior:** Source order is hero, navigation, person picker, route, supporting detail, packing, open items. All controls are native buttons/links with visible focus rings.
- **Screen-reader names and announcements:** Persona buttons expose `aria-pressed`; the selected route uses an atomic polite status region; calendar/share success and failure are named.
- **Contrast and non-color cues:** Status is carried by words, dots, borders, and labels, not color alone. Light and dark palettes are authored separately.
- **Touch targets:** Navigation, standalone actions, map/site link buttons, resets, check labels, and picker controls provide at least a 44px target. Inline itinerary links stay compact under the inline-link exception.
- **Reduced-motion behavior:** Ink and button movement stop or settle immediately under `prefers-reduced-motion`.
- **Sound controls and captions:** N/A, no sound or media.
- **Pause, skip, escape, undo, or recovery controls:** Skip link, Show everyone, reset buttons, and calendar status recovery are present.

## 10. Performance and Media Contract

- **Critical content available before enhanced media:** All itinerary content is HTML; the locally bundled band poster is below the picker and optional to the core route; Google Fonts are also optional enhancement.
- **Loading strategy:** One static document, no scripts or remote images beyond the font stylesheet; the band poster is a local JPEG asset and loads lazily below the fold.
- **Poster, skeleton, or static fallback:** CSS poster remains fully usable with font fallbacks and reduced motion; the band poster uses an explicit alt description and does not carry itinerary-critical information.
- **Slow-network and data-saver behavior:** Core content, persona filter, checklists, and calendar export do not depend on remote APIs.
- **Failed-media behavior:** If the local band poster cannot load, its alt text remains available and the itinerary, persona filter, checklist, and calendar export remain fully usable.
- **Rendering or animation budget:** Preserve single-file delivery, no build dependency, and compositor-only motion.
- **Target measurements and how they will be measured:** Zero horizontal overflow, four fonts loading when reachable, no page errors, and rendered visual inspection at 390px and 1280px in both color schemes.

## 11. Content Truth and Microcopy

- **Final headline and primary CTA:** “The Nashville Labor Day Gang” and “Pick your line”.
- **Terminology that must remain consistent:** Locked is teal, open is gold, work is red, Bruce is the dog, and all times are Central Time.
- **Claims or numbers requiring evidence:** Every fact, distance, time, phone number, venue detail, and meal count is governed by `PROJECT-BRIEF.md`.
- **Placeholders or fabricated data prohibited:** Never invent a confirmed booking, duration, shared RSVP, weather forecast, or address detail. The six open items stay open until confirmed.
- **Error and recovery voice:** Short, plain, and honest: explain when copy/download is unavailable without implying the action completed.

## 12. Implementation Boundaries

- **Existing patterns and dependencies to reuse:** Vanilla HTML/CSS/JS, existing semantic tokens, native controls, safe storage helpers, and the existing filter model.
- **Allowed files or surfaces:** `index.html`, `assets/bruce-and-the-gang.jpg`, `robots.txt`, `vercel.json`, and this local experience spec.
- **Must remain unchanged:** `README.md`, the four-font request, semantic color meanings, one-file site architecture, and the six open-item synchronization.
- **Explicitly out of scope:** Backend-backed RSVP/voting/shopping state, account/password provisioning, weather/maps APIs, external messages, commits, pushes, and confirmation of facts.
- **Known technical constraints:** No build step, no dependencies, Vercel static hosting, direct URL remains accessible unless platform password protection is separately enabled.

## 13. Assumptions and Open Decisions

| Item | Known, assumed, or unknown | Evidence | What would invalidate it |
| --- | --- | --- | --- |
| Unit number | Privacy redaction applied | User request and brief privacy note | Family needs the unit in the public copy |
| Shared state | Unknown backend requirement | Backlog says a backend or hosted form is needed | A selected service/account and data contract are provided |
| Calendar export | Known static-safe improvement | Brief backlog item 2 and stated times | A family calendar service requires a different format |
| Six open itinerary items | Unconfirmed | Brief section 5 and lock section | The family confirms an item, requiring synchronized edits |
| Public access | Known risk remains | Noindex is not authentication | Vercel password protection is enabled and verified |

## 14. Acceptance Criteria

1. A viewer can identify the weekend and the “Pick your line” action in the hero.
2. Selecting any valid persona updates `aria-pressed`, dims only irrelevant blocks, reveals that person’s notes, highlights their tags, and updates the shareable `me` URL.
3. Clearing the persona returns every block to the full route and removes the `me` URL parameter.
4. The hero downloads one `.ics` file containing the weekend and only brief-backed time anchors; eligible blocks download their own `.ics` file.
5. Copy failure does not produce a false success message and the selected route remains usable.
6. The page has zero horizontal overflow at 320px, 390px, and 1280px in light and dark color schemes; very narrow section labels remain readable and the countdown stays on one row.
7. All four required fonts report loaded when the font origin is reachable, and there are no page errors.
8. Open and locked semantics, six open items, and all `data-who` to `.tagp` persona mappings remain unchanged and honest.
9. Keyboard focus is visible, controls meet the touch-target contract, and reduced motion settles without animation.
10. The band poster appears after the `youBar`, stays uncropped at 390px, and does not introduce horizontal overflow or compete with the picker.
11. `README.md` remains byte-for-byte unchanged and no backend, dependency, or external account is introduced.

## 15. Verification Plan

- **Routes or stories:** `/`, initial state, each persona state, light and dark themes, calendar download, share URL, and clear state.
- **Viewports:** 320px x 900px, 390px x 844px, and 1280px x 900px.
- **Input modes:** Chromium click/touch-equivalent pointer, keyboard focus and activation, and script-level state assertions.
- **Network and failure scenarios:** Local static server, reachable Google Fonts, and clipboard-unavailable fallback.
- **Automated checks:** DOM assertions for overflow, fonts, page errors, persona filter integrity, URL state, calendar file content, and accessibility attributes.
- **Rendered QA evidence:** Chromium screenshots of light desktop, dark desktop, mobile, and mobile selected-person state, visually inspected.
- **Responsive QA loop:** required because poster type and stacked blocks are sensitive to narrow widths.
- **Final verifier:** Chromium assertions plus Boris and Fresh Eyes review before the Vercel deploy.
