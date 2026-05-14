---
spec: design.md@alpha
name: FORMA — Editorial Noir
description: >
  Quiet-luxury shapewear, sculpted in Nairobi. Dark editorial canvas, terracotta
  warmth, serif display + grotesque body, sharp corners, hairline rules, and a
  glassy "executive" surface treatment for cards and chrome.

tokens:
  color:
    surface:                       "#131312"
    surfaceDim:                    "#131312"
    surfaceBright:                 "#3a3937"
    surfaceContainerLowest:        "#0e0e0c"
    surfaceContainerLow:           "#1c1c1a"
    surfaceContainer:              "#20201e"
    surfaceContainerHigh:          "#2a2a28"
    surfaceContainerHighest:       "#353532"
    surfaceVariant:                "#353532"
    background:                    "{color.surface}"
    inverseSurface:                "#e5e2de"
    inverseOnSurface:              "#31302e"

    onSurface:                     "#e5e2de"
    onSurfaceVariant:              "#dcc1b5"
    onBackground:                  "{color.onSurface}"
    outline:                       "#a48c81"
    outlineVariant:                "#56433a"

    primary:                       "#ffb693"
    onPrimary:                     "#561f00"
    primaryContainer:              "#dc743e"
    onPrimaryContainer:            "#4b1b00"
    inversePrimary:                "#9c440f"
    primaryFixed:                  "#ffdbcc"
    primaryFixedDim:               "{color.primary}"

    secondary:                     "#cac6c0"
    onSecondary:                   "#32302c"
    secondaryContainer:            "#4b4945"
    onSecondaryContainer:          "#bcb8b2"

    tertiary:                      "#dec1a9"
    onTertiary:                    "#3e2d1c"
    tertiaryContainer:             "#a58c76"
    onTertiaryContainer:           "#372616"

    error:                         "#ffb4ab"
    onError:                       "#690005"
    errorContainer:                "#93000a"
    onErrorContainer:              "#ffdad6"

  typography:
    display:
      fontFamily: "EB Garamond"
      fontSize: 64px
      lineHeight: 1.1
      letterSpacing: -0.02em
      fontWeight: 400
    displayMobile:
      fontFamily: "{typography.display.fontFamily}"
      fontSize: 40px
      lineHeight: 1.2
      fontWeight: 400
    headlineMd:
      fontFamily: "EB Garamond"
      fontSize: 32px
      lineHeight: 1.2
      fontWeight: 400
    bodyLg:
      fontFamily: "DM Sans"
      fontSize: 18px
      lineHeight: 1.6
      fontWeight: 400
    bodyMd:
      fontFamily: "DM Sans"
      fontSize: 16px
      lineHeight: 1.6
      fontWeight: 400
    labelCaps:
      fontFamily: "DM Sans"
      fontSize: 12px
      lineHeight: 1
      letterSpacing: 0.1em
      fontWeight: 600
      textTransform: uppercase
    button:
      fontFamily: "DM Sans"
      fontSize: 14px
      lineHeight: 1
      letterSpacing: 0.05em
      fontWeight: 500

  spacing:
    stackSm:       8px
    stackMd:       16px
    stackLg:       32px
    gutter:        24px
    marginMobile:  20px
    marginDesktop: 64px
    sectionGap:    120px

  layout:
    containerMax: 1440px
    headerHeight: 80px
    grid:
      desktop: 12-col, 24px gutter, 64px outer margin
      mobile:  4-col, 16px gutter, 20px outer margin

  radius:
    sm:   0
    md:   0
    lg:   0
    xl:   0
    pill: 8px

  elevation:
    flat:        "none"
    glassPanel:  "0 0 0 1px {color.onSurface}/8, inset 0 1px 0 {color.onSurface}/9 (top sheen)"
    glassBar:    "0 1px 0 {color.onSurface}/8 (bottom hairline)"

components:
  button.primary:
    backgroundColor: "{color.primaryContainer}"
    textColor:       "{color.onPrimary}"
    typography:      "{typography.button}"
    rounded:         "{radius.pill}"
    padding:         "12px 24px"
    hover:           "darken 6%"
  button.ghost:
    backgroundColor: "transparent"
    textColor:       "{color.onSurface}"
    border:          "1px solid {color.outlineVariant}"
    typography:      "{typography.button}"
    rounded:         "{radius.pill}"
    padding:         "12px 24px"
  card.product:
    backgroundColor: "{color.surfaceContainer}/62 (glass)"
    backdropFilter:  "blur(24px) saturate(140%)"
    border:          "1px solid {color.onSurface}/8"
    rounded:         "{radius.md}"
    padding:         0
    innerHighlight:  "1px linear-gradient(180deg, {color.onSurface}/9 → transparent 36%)"
  header.bar:
    backgroundColor: "{color.background}/70 (glass)"
    backdropFilter:  "blur(18px) saturate(130%)"
    borderBottom:    "1px solid {color.onSurface}/8"
    height:          "{layout.headerHeight}"
  divider.hairline:
    border:          "1px solid {color.onSurface}/8"
  badge.caps:
    typography:      "{typography.labelCaps}"
    textColor:       "{color.onSurfaceVariant}"
---

## Overview

FORMA is a quiet-luxury shapewear label sculpted in Nairobi. The design system is
called **Editorial Noir**: a dark, paper-quiet canvas inherited from fashion
editorial — wide margins, a single warm terracotta accent, generous vertical
rhythm, and confident serif display type. Cards, header, newsletter, and side
rails wear a **glassy executive** treatment (translucent surface, hairline
border, 1px top-edge sheen) layered on top of the noir canvas.

The brand voice is restrained. Components are sharp-cornered by default; only
pills and inputs round (`{radius.pill}`). One accent — terracotta — does all the
work; secondary and tertiary stay in cream/nude tones so the page never
fragments into competing colors.

## Colors

- **Primary canvas** is `{color.surface}` (#131312) — a warm near-black. Never use pure `#000`.
- **Terracotta** (`{color.primary}` / `{color.primaryContainer}`) is the single statement accent. Reserve it for CTAs, price, the one element on a page that must catch the eye. If two terracotta things compete on a page, demote one.
- **Cream + nude** (`{color.secondary}`, `{color.tertiary}`) are quiet, mostly for badges, secondary text, and decorative dividers.
- Body copy uses `{color.onSurface}` (warm bone). Muted copy uses `{color.onSurfaceVariant}` (warm taupe) — do not drop opacity instead; use the variant token so warmth is preserved.
- Outlines are warm browns (`{color.outline}`, `{color.outlineVariant}`), not neutral greys.

## Typography

- **Display + headlines: EB Garamond** (`{typography.display}`). Italics are encouraged for editorial mood (collection names, hero phrases). Weight 400; do not bold serif headlines.
- **Body + UI: DM Sans** (`{typography.bodyLg}`, `{typography.bodyMd}`). Grotesque, quiet, sets a calm pace next to the serif.
- **Caps labels** (`{typography.labelCaps}`) are the only place we track letters (`0.1em`). Use for eyebrows, badges, tag chips. Never use serif for caps.
- **Buttons** (`{typography.button}`) — 14px, weight 500, `0.05em` tracking. No all-caps unless it is a caps badge masquerading as a button.
- Mobile downshifts hero display to `{typography.displayMobile}` (40px). Do not scale fluidly past this — pick a token.

## Layout

- Max content width is `{layout.containerMax}` (1440px), centered with `{spacing.marginDesktop}` (64px) outer margin on desktop, `{spacing.marginMobile}` (20px) on mobile.
- Grid: **12 columns / 24px gutter** desktop, **4 columns / 16px gutter** mobile.
- Vertical rhythm: section-to-section gap is `{spacing.sectionGap}` (120px). Stack tokens (`stackSm` 8, `stackMd` 16, `stackLg` 32) for in-component rhythm. Resist inventing in-between values.
- Header is fixed at `{layout.headerHeight}` (80px) and uses the glass bar.

## Elevation & Depth

FORMA avoids drop shadows. Depth comes from **translucency + hairlines**, not blur shadows.

- `glassPanel` — translucent surface (62% over canvas), `blur(24px) saturate(140%)`, 1px outer hairline at 8% on-surface, and a 1px inner top sheen that fades by 36%. Use on cards, newsletter, side rails, modals.
- `glassBar` — quieter variant for the header. 70% canvas, lighter blur, no top sheen, hairline only on the bottom edge.
- `hairline` — 1px at 8% on-surface. The default way to separate sections, table rows, and footer columns.
- Never add `box-shadow`. If something needs to lift, it gets glass — not a shadow.

## Shapes

- Cards, surfaces, images, modals: **sharp corners** (`{radius.md}` = 0). This is load-bearing for the editorial feel — do not soften.
- Buttons, inputs, chips: `{radius.pill}` (8px). Just enough roundness to read as interactive, not enough to feel friendly.
- Product imagery is presented full-bleed inside its glass card; do not inset.

## Components

- **Primary button** — terracotta container, pill, used at most twice per viewport. The "Add to bag" and the hero CTA should not both be primary unless they are the same action.
- **Ghost button** — transparent with `outlineVariant` border. Use for everything secondary.
- **Product card** — glass panel, sharp corners, full-bleed image, caps label for category, serif for product name, terracotta for price.
- **Header** — glass bar; logo wordmark in serif at weight 400; nav items in DM Sans, no underline until hover; cart indicator uses caps label.
- **Newsletter / side rails** — glass panel + hairline divider above the form; serif headline, sans body, ghost button.
- **Hairline divider** — preferred separator everywhere. Avoid filled bars.
- **Caps badge** — eyebrow above serif headlines; also used for "NEW", "LAST PIECES" tags. Color `onSurfaceVariant`, never primary.

## Do's and Don'ts

**Do**
- Reserve terracotta for the single most important action on screen.
- Pair EB Garamond display with DM Sans body — always one of each per block.
- Use hairlines and glass for separation. Let the canvas breathe.
- Use italic serif for collection names and editorial phrasing.
- Keep cards full-bleed and sharp-cornered.

**Don't**
- Don't introduce a second accent color. Terracotta is the whole accent budget.
- Don't use pure black (`#000`) or pure white (`#fff`) — both clash with the warm palette.
- Don't add drop shadows. Depth is glass, not blur-shadow.
- Don't round product cards or images. Pills are for inputs and buttons only.
- Don't bold serif headlines or set DM Sans below 12px.
- Don't track letters anywhere except `labelCaps` (`0.1em`) and `button` (`0.05em`).
- Don't fade muted text with opacity — use `{color.onSurfaceVariant}`.
