# SOMAVAC — WordPress-ready forms

Three self-contained, styled forms extracted from the static site. Each `.html`
file is a complete snippet you paste into a **Custom HTML block** in WordPress.
No Tailwind, no theme CSS, no plugin required — the styling is baked in and
scoped to `.smv-form-wrap` so it can't collide with your theme.

| File | Goes on page | Button |
|------|--------------|--------|
| `1-homepage-inquiry.html`        | Home / Contact | Send Inquiry |
| `2-patients-find-provider.html`  | Patients       | Find a Provider Near Me |
| `3-physicians-consultation.html` | Physicians     | Request Practice Consultation |

`preview-all.html` — open this in your browser to see all three rendered. It's
just for previewing; don't paste it into WordPress.

---

## Step-by-step: putting one on a page

1. Log in at `https://staging.somavac.com/wp-admin/`.
2. Open the page you want (e.g. **Pages → Physicians → Edit**).
3. Click **+** to add a block, search **"Custom HTML"**, add it.
4. Open the matching `.html` file here, **select all, copy**, and **paste** it
   into the Custom HTML block.
5. Click **Preview** (top right) to confirm it looks right, then **Update**.

That's it for the look. The form is styled and mobile-responsive immediately.

---

## Making it actually send (the one required edit)

Each form has this line near the top:

```html
<form class="smv-form" action="REPLACE_WITH_YOUR_FORM_ENDPOINT" method="POST">
```

Replace `REPLACE_WITH_YOUR_FORM_ENDPOINT` with the URL of whatever handles your
submissions. You mentioned you already have a handler — point it there and
you're done. The fields are ready: every input has a proper `name` attribute
(`firstName`, `lastName`, `email`, `role`, `message`, etc.), so a standard POST
handler will receive them as normal form fields.

There's also a hidden **honeypot** field (`_honey`) for basic spam filtering —
if your handler sees it filled in, treat the submission as a bot and discard it.

### If you'd rather it just email you (no handler needed)
Swap the `action` for a free form-relay service — no backend, no plugin:
- **Web3Forms** (https://web3forms.com): grab a free access key, set
  `action="https://api.web3forms.com/submit"`, and add
  `<input type="hidden" name="access_key" value="YOUR-KEY">` inside the form.
- **Formspree** (https://formspree.io): set
  `action="https://formspree.io/f/YOUR-ID"`.

Say the word and I'll wire either one in for you.

---

## Notes
- Fonts (Montserrat + Source Sans 3) load from Google Fonts via the `@import`
  at the top of each snippet — same fonts as the main site.
- Colors match the brand exactly: navy `#04078e` / `#02055e`, coral `#ea5329`.
- The snippet is capped at `max-width:560px` and centered. To make it full-width
  in a narrow column, change `max-width:560px` in `.smv-form-wrap` to `100%`.
