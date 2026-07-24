# Building new Fluent Forms & swapping them in (without losing submissions)

Goal: replace the current forms with new ones that match the mockups, while
keeping submissions flowing (entries saved + notification emails + reCAPTCHA).

## The golden rule: DUPLICATE, don't start blank

A blank Fluent Form has **no** email notification, no reCAPTCHA, no confirmation
message. If you build from blank and swap it in, submissions may save but no one
gets emailed — the classic "form stopped working" trap.

Instead, **duplicate the existing working form** so the copy inherits all that
plumbing, then just change the fields.

**Fluent Forms → All Forms → hover the form → Duplicate.**

---

## Step-by-step

### 1. Duplicate the matching existing form
- Homepage / general inquiry  → duplicate **Form 1**
- Physicians consultation      → duplicate **Form 1** (same shape)
- Patients find-a-provider     → duplicate **Form 2/3**

Rename the copy clearly, e.g. "Physicians – Consultation (new)".

### 2. Edit the copy's fields to match the spec below
Open the duplicate → **Editor** (drag-and-drop). Add / rename / reorder fields,
edit the dropdown options, and set the submit button label.

### 3. Re-check the plumbing on the copy  ← the part that protects submissions
Even though duplicating carries settings over, verify each one:
- **Settings → Email Notifications**: notification is **Active**, "Send To" is a
  real inbox, and the merge tags in the body still match your new field names
  (e.g. `{inputs.email}`). Renaming/replacing a field can orphan a merge tag.
- **Settings → Confirmations**: the thank-you message / redirect is set.
- **reCAPTCHA**: your site already has global reCAPTCHA v3 keys, so the field
  inherits them — just confirm the reCAPTCHA element is present on the form.
- **Integrations** (patients form only): if the old one had an SMS/CRM action
  tied to the SMS-consent checkbox, re-point it to the new field.

### 4. Swap it onto the page
Each form is placed via a **Fluent Forms block** or shortcode `[fluentform id="N"]`.
- Edit the page → find the existing Fluent Forms block → change the selected form
  to the new one (or replace the shortcode's id with the new form id).
- **Update** the page.

### 5. Test BEFORE deleting the old form
- Submit a real test on the live page.
- **Fluent Forms → Entries** → confirm it landed on the NEW form.
- Confirm the notification email arrived.
- Only once that's verified, delete or archive the old form.

> Do steps 1–5 on **staging.somavac.com first**, then repeat on production.

### 6. Styling is automatic
The CSS skin (`fluent-forms-skin.css`, in Appearance → Customize → Additional
CSS) targets Fluent Forms classes, not a specific form id — so your new forms
get the SOMAVAC look with zero extra work.

---

## Field specs

### Form A — Homepage / "Send Inquiry"
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| First Name | text | yes | |
| Last Name | text | yes | |
| Email | email | yes | |
| I am a... | dropdown | no | Surgeon / Physician · Patient · Caregiver · Distributor / Partner · Other |
| Message | textarea | no | placeholder "How can we help you?" |
| **Button** | | | **Send Inquiry** |

### Form B — Physicians / "Request a Practice Consultation"
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| First Name | text | yes | |
| Last Name | text | yes | |
| Email | email | yes | |
| Practice / Hospital | text | no | |
| Specialty | dropdown | no | Plastic Surgery · Breast Surgery / Oncology · General Surgery · Body Contouring / Abdominoplasty · Other |
| Anything else? | textarea | no | |
| **Button** | | | **Request Practice Consultation** |

### Form C — Patients / "Find a SOMAVAC Provider"
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| First Name | text | yes | |
| Last Name | text | yes | |
| Email | email | yes | |
| Zip Code | text | yes | 5-digit; set input mask / validation `[0-9]{5}` |
| Procedure Type | dropdown | no | Mastectomy · Breast Reconstruction · Hernia Repair · Abdominoplasty (Tummy Tuck) · Orthopedic Surgery · Other / Not Sure |
| Surgeon's Name (if known) | text | no | |
| Anything else we should know? | textarea | no | |
| **Button** | | | **Find a Provider Near Me** |

---

## Rollback safety
Keep the old forms until the new ones are verified in production. Because you
duplicated (not overwrote), the originals are untouched — if anything looks off,
change the page's form id back to the old one and you're instantly restored.
