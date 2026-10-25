# DukeOps — Recommended Changes for a More Modern, Classy Look

This review is based on rendered screenshots of all 5 pages at desktop (1440px), tablet (768px), and mobile (375px / 320px).

**The main problem:** the site works and is consistent, but it is **too busy**. Almost every section has an eyebrow label, a heading, a lead paragraph, bordered cards, tag chips, and two buttons. Upmarket sites feel calm because they hold back: fewer elements, more whitespace, bigger type, and one clear action per section.

**Guiding rule for every change below:** _one idea per section, one main action per screen, and remove anything that doesn't help someone decide to contact DukeOps._

---

## 1. Hero (Top Priority)

### What's wrong today
The homepage hero currently stacks **8 separate layers** above the fold:

1. Top utility bar (address, hours, phone, email)
2. Eyebrow ("DAR ES SALAAM • NATIONWIDE OPERATIONS")
3. A 4-line headline ("Empowering Tanzanian Businesses to Build Safely & Reliably")
4. A 3-line description paragraph
5. Two large CTA buttons
6. A "Start an inquiry by division" label plus **4 chip buttons**
7. A framed photo with its own caption bar and "Certified Standards" badge
8. A 4-column metrics bar

That makes **7 clickable actions** competing in the first screen. On mobile it's worse: the photo is pushed below the chips, so a phone visitor sees mostly text and buttons and never reaches the image or the metrics without scrolling a long way.

The background also uses a radial gold glow, which looks generic and template-like.

### Recommended hero
A **full-bleed photographic hero** with a single strong statement:

- **Remove:** the eyebrow, the 4 division chips and their label, the photo caption bar and badge, and the radial gold glow.
- **Move:** the metrics bar out of the hero into a slim band just below it (see §1.3).
- **Shorten the headline** to 6–8 words. For example:
  - _"Built safely. Delivered reliably."_
  - _"Engineering, safety & supply — under one roof."_
  - _"Tanzania's partner for safe, reliable building."_
- **Shorten the description** to one sentence (around 20 words): _"HSE consultancy, construction, utilities and hardware supply for businesses across Tanzania."_
- **Actions:** one gold primary button (**Request a Quote**) plus a quiet text link (**Explore services →**). Drop the second large outlined button.
- **Photo:** make it the full-width background with a dark gradient over it (strongest on the left, where the text sits), so it reads as atmosphere rather than a framed stock image.
- **Height:** about `min(88vh, 760px)` on desktop. On mobile, keep the text at the bottom of the photo, like an editorial cover.

#### Suggested markup
```html
<section id="hero-section" class="hero-cover">
  <img class="hero-cover__bg" src="assets/images/hero-site.jpg" alt="" fetchpriority="high" />
  <div class="container hero-cover__content">
    <h1 class="hero-cover__title">Built safely.<br />Delivered reliably.</h1>
    <p class="hero-cover__lead">
      HSE consultancy, construction, utilities and hardware supply
      for businesses across Tanzania.
    </p>
    <div class="hero-cover__actions">
      <a href="contact.html" class="btn btn-primary btn-lg">Request a Quote</a>
      <a href="services.html" class="link-quiet">Explore services <i class="bi bi-arrow-right"></i></a>
    </div>
  </div>
</section>
```

#### Suggested CSS direction
```css
.hero-cover { position: relative; min-height: min(88vh, 760px); display: flex; align-items: flex-end; color: #fff; overflow: hidden; }
.hero-cover__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hero-cover::after { content: ""; position: absolute; inset: 0;
  background: linear-gradient(90deg, rgba(12,15,20,.88) 0%, rgba(12,15,20,.55) 45%, rgba(12,15,20,.15) 100%),
              linear-gradient(0deg, rgba(12,15,20,.7) 0%, transparent 50%); }
.hero-cover__content { position: relative; z-index: 1; padding-block: 0 5rem; max-width: 720px; margin-inline: 0 auto; }
.hero-cover__title { font-size: clamp(2.6rem, 6vw, 5rem); font-weight: 600; letter-spacing: -0.04em; line-height: 1.02; color: #fff; }
.hero-cover__lead { font-size: 1.125rem; color: rgba(255,255,255,.78); max-width: 46ch; margin: 1.25rem 0 2rem; }
.hero-cover__actions { display: flex; align-items: center; gap: 1.75rem; flex-wrap: wrap; }
```

### 1.2 Photo choice
The current hero photo is a posed group of workers looking at the camera, which reads as stock imagery. Classier options:
- A wide, quiet shot of a finished building at golden hour, **or**
- A close-up of hands at work (switchgear, rebar tying, a safety inspection), with no one looking into the lens.

Real DukeOps project photography would beat any generated or stock image. Swap it in as soon as it's available.

### 1.3 Metrics band (moved out of the hero)
Put the numbers in a slim, light band directly below the hero: a white background, large thin numerals, small muted labels, and thin vertical dividers between them. Remove the gold left borders.

> [!IMPORTANT]
> Only publish numbers DukeOps can back up. "15+ Certifications" and "200+ Happy Clients" will be checked by procurement teams. If they can't be verified, use concrete facts instead (e.g. *"OSHA-registered"*, *"Est. 2020"*, *"Dar es Salaam HQ"*).

### 1.4 Where the division chips go
The 4 "inquiry by division" shortcuts are useful, so move them rather than delete them. Each division card in **Our Key Services** already links to `contact.html?service=…`. That is enough.

---

## 2. Header & Navigation

| Issue | Recommendation |
|---|---|
| A top utility bar **and** a dark header create two heavy bars of chrome | **Remove the top bar.** Phone and email already appear in the footer, the contact page, and the mobile menu. One header bar is enough. |
| Header is always solid dark | Make it **transparent over the hero** and switch to solid on scroll. This works with the new full-bleed hero. Keep inner pages solid. |
| Active link shows a filled background **plus** an underline | Use one indicator only: a 2px gold underline, or just white text vs. muted text. |
| Gold "Get a Quote" button + gold quote tray + gold logo border | Gold should be rare. Keep it for the single primary CTA. Make the Quote List tray a neutral outline. |
| "TANZANIA" tag under the logo | Optional: remove it for a cleaner wordmark, or set it smaller with wider letter-spacing. |

---

## 3. Visual Language (Site-Wide)

### 3.1 Typography — the biggest "classy" lever
- **Headings are too heavy.** Weights of 700–800 everywhere feel loud. Use **600** for large display headings and **500–600** for section titles, with tighter letter-spacing (`-0.03em` to `-0.04em`).
- **Scale up the contrast.** Make the hero and section titles bigger but lighter, and keep body text at 16–17px. Big-and-light reads as premium; medium-and-bold reads as template.
- **Optional refinement:** pair Inter with a restrained serif for display headings only, such as _Fraunces_, _Instrument Serif_, or _Newsreader_. A single serif headline per section brings a lot of sophistication without hurting readability.
- **Limit line length** of lead paragraphs to about `60ch`.

### 3.2 Colour discipline
- Gold currently appears on eyebrows, eyebrow dashes, icons, badges, buttons, stars, borders, step numbers, and the quote tray. **Reduce gold to about 5% of the screen:** primary CTAs, one accent per section, and the active nav state.
- Use **neutral icons** (ink or muted grey) instead of gold-tinted icon boxes.
- Remove the **radial gold glows** from the hero, page heroes, and CTA banners. Use flat dark surfaces or the photo-with-gradient treatment instead.

### 3.3 Retire repeated "template" patterns
| Pattern | Seen on | Change |
|---|---|---|
| Gold-dash eyebrow above **every** heading | Every section on every page | Keep eyebrows only where they add context (about 1 per page). Elsewhere, let the heading stand alone. |
| Tag chips (`spec-tag`) | Division cards, service cards, catalog headers | Remove from homepage cards. On the services page, turn them into a plain comma-separated line of muted text. |
| Bordered card for everything | Divisions, capabilities, values, steps, projects, testimonials, contact channels | Use **cards only for clickable items** (projects, products). Show values, capabilities, and process steps as open columns separated by whitespace or a thin top rule. |
| Icon-in-a-square above every card title | Divisions, capabilities, values, contact cards | Remove from values and capabilities, or use a small 20px line icon inline with the title. |
| Two buttons per card | Division cards, service cards, product cards | One action per card. Make the whole card the link, or use a single text link. |

### 3.4 Spacing and rhythm
- Increase section padding on desktop to about **8–9rem**, and reduce how many sections there are (see §4).
- Alternate backgrounds sparingly. Several white/limestone/subtle bands in a row look striped. Use mostly one surface, with one contrasting dark band (the CTA) near the end.
- Use **asymmetric layouts** in a few places (e.g. heading on the left 5 columns, content on the right 7 columns) instead of centering everything.

### 3.5 Motion
- Keep the subtle reveal, but shorten it (a fade plus 8px rise, 300ms).
- Remove hover lift (`translateY(-3px)`) from non-clickable cards.
- Remove the scroll progress bar. It adds noise and isn't expected on a corporate site.

---

## 4. Homepage Structure

Current flow: Hero → Services → Why Choose Us → Projects → Testimonials → CTA → Footer.

**Recommended flow (tighter):**

1. **Hero:** headline, one sentence, one CTA (see §1)
2. **Metrics band:** slim, verified numbers only
3. **What we do:** 4 divisions as a clean **numbered list or 4-column row** (01–04, title, one sentence, arrow link), with no tags, no icon boxes, and no secondary buttons
4. **Selected work:** 3 projects as large image-led tiles. Title and location only, with details on hover or a click-through. Remove status badges, dates, footers, and "Scope →" links.
5. **Why DukeOps:** merge with testimonials. One large pull-quote from a client on one side, 3 short proof points on the other. Remove the 4 capability cards.
6. **CTA band:** dark, one line, one primary button plus a WhatsApp link
7. **Footer**

This removes one full section and about 40% of the visible UI elements without losing any content that matters.

### Specific homepage fixes
- **Division cards:** remove the "DIVISION 01" index label, the 4 tags, and the outline button. Keep the title, description, and one "Learn more →" link.
- **Why Choose Us:** the left column (heading, paragraph, 3 checks, button) plus a 2×2 card grid is two sections squeezed into one. Pick one.
- **Testimonials:** remove the star ratings, which look unverifiable. Use one large typographic quote with the name and company below it. Add company logos if any are available.
- **Projects:** use 4:5 or 3:2 image ratios, larger images, and text overlaid on the bottom of the image on hover/focus.

---

## 5. Inner Pages

### 5.1 Page heroes (About, Services, Hardware, Contact)
- They are tall dark blocks with a large empty right half. Either **reduce the height** (about 40% shorter), or add a relevant image on the right (cropped project photo, product collage on Hardware).
- Remove the eyebrow. The breadcrumb plus the H1 is enough.
- Consider a **light page hero** (limestone background, dark text) for inner pages. It contrasts with the dark homepage hero and feels lighter and more editorial.

### 5.2 About
- **Core values** and **How we work** are two 4-card grids in a row, which looks repetitive. Show values as a simple 2×2 text list with no cards. Show the process as a horizontal numbered timeline joined by a thin connecting line.
- Use a larger, cropped team photo (bleeding to the edge of the viewport on one side) instead of the framed card with a caption bar.

### 5.3 Services
- Each division block currently has a badge, a tag, the title, a description, 4 tags, 2 buttons, and a deliverables box. **Simplify to:** title, description, deliverables list, and one CTA. Remove the badge and tag rows.
- Add **one image per division** (alternating left/right). This breaks up the wall of text and makes the page feel premium.
- The sticky jump bar is good. Restyle it as plain text links with an underline indicator instead of pill buttons.

### 5.4 Hardware Catalog
- **Product cards:** remove the category label on the image (the section header already says it). Keep only the stock badge, and only when stock is *Limited*. "In Stock" on everything is noise.
- **Buttons:** combine them into one primary action (**Add to quote**) plus a small WhatsApp icon button, rather than two equal-width buttons.
- **Toolbar:** remove the duplicate "Quote List" button (it's already in the header and the floating bar). Use underlined tabs for the filters instead of bordered pills.
- **Floating elements:** the floating quote bar and the floating WhatsApp button overlap on mobile. Hide the WhatsApp float on the hardware page when the quote bar is visible.
- Give product photos a consistent neutral background so the grid looks curated (the cement and rebar photos are busier than the others).

### 5.5 Contact
- Already the cleanest page. Small refinements:
  - Merge the 4 sidebar cards into **one quiet panel** with 4 rows (icon, label, value), with no individual borders.
  - Add an embedded static map image or a small office photo for trust.
  - Reduce the form intro text to one line.

---

## 6. Footer
- **Remove the "Quick Email Inquiry" form.** It duplicates the contact page, only opens a `mailto:`, and makes the footer heavy.
- Rebalance to 3 columns: brand line plus contact details | Services | Company.
- Add a large, light closing line above the columns, e.g. _"Let's build something that lasts."_ with a single link to Contact. This is a classy sign-off pattern.
- Make the bottom bar lighter (smaller text, more muted).

---

## 7. Floating & Persistent UI
- **Floating WhatsApp button:** make it smaller (48px) and quieter (dark ink with a green icon), and show it **only after the user scrolls past the hero**. Right now it overlaps content on several screens.
- **Quote List tray:** show it in the header only when it has items (this already happens on non-hardware pages). Keep that behaviour, but restyle it neutral.

---

## 8. Content & Credibility (Classy = Credible)
- Replace generic claims ("Certified Excellence", "Proven Track Record", "24/7 Support") with **specific, verifiable facts**: registrations (OSHA/ERB/CRB numbers), named clients or sectors, the year established, and real project names and locations.
- Use **real project photography** wherever possible. Generated images are fine as placeholders but should be replaced before launch.
- Tighten copy everywhere by about 30%. Most descriptions can lose their second sentence.
- Phone & WhatsApp number updated to `+255 699 669 959`.

---

## 9. Prioritised Implementation Plan

| # | Change | Impact | Effort |
|---|---|---|---|
| 1 | New full-bleed hero (§1), metrics moved below, remove top bar (§2) | ★★★★★ | Medium |
| 2 | Typography weights/scale + gold reduction (§3.1–3.2) | ★★★★★ | Low |
| 3 | Remove eyebrows, tags, icon boxes, double buttons site-wide (§3.3) | ★★★★ | Low–Medium |
| 4 | Homepage restructure: divisions list, image-led projects, merged proof + testimonial (§4) | ★★★★ | Medium |
| 5 | Footer simplification (§6) + floating button behaviour (§7) | ★★★ | Low |
| 6 | Inner page heroes lighter/shorter; services page with images (§5.1, §5.3) | ★★★ | Medium |
| 7 | Hardware card & toolbar simplification (§5.4) | ★★★ | Low |
| 8 | About/Contact refinements (§5.2, §5.5) | ★★ | Low |
| 9 | Real photography + verified credentials (§1.2, §8) | ★★★★★ | Depends on client assets |

**Suggested first step:** do items **1–3** together. They change the overall feel of the site the most, and they don't touch any of the working features (quote list, catalog filters, contact form logic, CMS IDs).
