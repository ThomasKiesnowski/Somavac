// =============================================================
// SOMAVAC patient stories — single source of truth.
// Both patient-stories.html and patient-community.html read from
// this file. To add a new story, append a new object to the array.
//
// Required fields per story:
//   id, audience, category, title, subtitle, author, role, image,
//   imageCaption, readTime, cardSummary, paragraphs[], pullQuote
//
// audience must be one of: 'patients', 'caregivers', 'physicians'
// =============================================================
window.PATIENT_STORIES = [
  {
    id: 'a-caregivers-story',
    audience: 'caregivers',
    category: "A Caregiver's Story",
    title: "A Caregiver’s Story",
    subtitle: "Clinical evidence reinforces what caregivers experience firsthand.",
    author: "Michael Ker",
    role: "Husband and Caregiver",
    image: "/brand_assets/caregiver-couple.jpg",
    imageCaption: "Michael & Kathy",
    readTime: "3 min read",
    cardSummary: "Managing his wife’s post-surgical drains became a countdown. He wishes he’d known about SOMAVAC sooner.",
    paragraphs: [
      "Caring for my wife after her mastectomy was both an act of love and one of the hardest responsibilities I’ve ever faced. Managing her post-surgical drains required constant attention — I emptied, measured, and sanitized them several times a day, carefully watching the color of the discharge for signs of healthy recovery. The drains were uncomfortable to her, so it became a countdown for their removal. It is hard to believe with all the advancements in medicine, patients are still subjected to this rudimentary device for post surgical recovery.",
      "As her caregiver, I found the emotional toll almost as heavy as the physical work. The focus, understandably, is always on the patient, but it can leave the caregiver feeling invisible and overwhelmed. I ran myself ragged trying to keep up — to the point that stress caught up with me, and I came down with shingles. Looking back, I wish I had known about the Somavac device earlier; it would have made drain management much easier and lightened the load both physically and emotionally. Anything that helps lessen the daily burden allows a spouse to be more present, more supportive, and a little less consumed by the demands of care."
    ],
    pullQuote: "Anything that helps lessen the daily burden allows a spouse to be more present, more supportive, and a little less consumed by the demands of care."
  },

  // -------- Placeholder patient story --------
  {
    id: 'placeholder-story-two',
    audience: 'patients',
    category: "A Patient's Story",
    title: "Lorem Ipsum Dolor Sit Amet",
    subtitle: "Consectetur adipiscing elit sed do eiusmod tempor incididunt.",
    author: "Lorem Ipsum",
    role: "Placeholder — replace with real patient",
    image: "/brand_assets/testimonial-1.jpg",
    imageCaption: "Placeholder caption",
    readTime: "2 min read",
    cardSummary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam."
    ],
    pullQuote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
  },

  // -------- Placeholder physician story --------
  {
    id: 'placeholder-story-three',
    audience: 'physicians',
    category: "A Physician's Story",
    title: "Ut Enim Ad Minim Veniam",
    subtitle: "Quis nostrud exercitation ullamco laboris nisi ut aliquip.",
    author: "Lorem Ipsum, MD",
    role: "Placeholder — replace with real physician case study",
    image: "/brand_assets/testimonial-3.jpg",
    imageCaption: "Placeholder caption",
    readTime: "2 min read",
    cardSummary: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    paragraphs: [
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
      "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet."
    ],
    pullQuote: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt."
  }
];

// =============================================================
// Audience filter metadata (used by both pages)
// =============================================================
window.PATIENT_STORY_AUDIENCES = [
  { id: 'all',         label: 'All Stories',     iconPath: 'M4 6h16M4 12h16M4 18h16' },
  { id: 'patients',    label: 'For Patients',    iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'caregivers',  label: 'For Caregivers',  iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { id: 'physicians',  label: 'For Physicians',  iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
];
