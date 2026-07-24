// =============================================================
// SOMAVAC patient stories, single source of truth.
// Both patient-stories.html and patient-community.html read from
// this file. To add a new story, append a new object to the array.
//
// Required fields per story:
//   id, audience, category, title, subtitle, author, role, image,
//   imageCaption, readTime, cardSummary, paragraphs[], pullQuote
// Optional:
//   video  (YouTube URL, patient testimonial video)
//
// audience must be one of: 'patients', 'caregivers', 'physicians'
// =============================================================
window.PATIENT_STORIES = [
  {
    id: "lynne-b",
    audience: "patients",
    category: "A Patient's Story",
    title: "Five Surgeries. One Game-Changer.",
    subtitle: "After years of the same drains her mom had in 2004, Lynne’s fifth surgery finally felt different.",
    author: "Lynne B.",
    role: "Mastectomy & Reconstruction",
    image: "/brand_assets/testimonials/lynne-b.jpg",
    imageCaption: "Lynne B.",
    readTime: "3 min read",
    video: "https://www.youtube.com/watch?v=t4CJW15_tWw",
    cardSummary: "Four surgeries with standard drains, the same ones her mom had in 2004. On her fifth, Lynne woke up to SOMAVAC: drains out in 6 days, and she’s been handing collection bags to friends ever since.",
    paragraphs: [
      "On February 18th I went in to have my reconstruction corrected. I’d had my mastectomy in 2023, and my reconstruction had several issues, so this was my fifth procedure. Every single time before, I had the standard of care: the tubes and the bulb drains. My mom passed from breast cancer in 2004, and the standard of care she had then was the exact same thing I kept waking up to all these years later. Same tubes, same drains, same everything. This time, I woke up to this amazing little machine strapped around me, not cumbersome at all. It was the most effective, least troublesome, least worrisome thing I’ve used through my whole recovery.",
      "I know what the other road looks like. About eight weeks after my mastectomy and reconstruction, a bacterial infection set in, and I battled it for months on heavy medication, until they finally had to open me back up and clean it out. And what did I wake up to again? Another set of tubes and that lovely little bulb.",
      "My husband and I laugh that SOMAVAC probably saved our marriage. Nick had requested time off to stay home, because with tubes and drains it’s just not easy to do anything on your own. This time, I sent him back to work. SOMAVAC gives you the mobility, the freedom, the independence. I didn’t have to ask for help. I had my independence back, and that’s what SOMAVAC gives you.",
      "My surgeon pulled my drains at six days. Six! I averaged ten to fourteen on every other surgery, and this time there was no swelling, no problems, nothing. I’ve given about six collection bags away to friends going through what I’ve been through, and I tell them to take it to their doctor and say, “This is what I want.” It’s a shame it isn’t offered as standard for this type of surgery, because it should be. In one word: a true game-changer.",
      "With everything I’ve been through, this recovery was the most mentally safe one for me, because healing isn’t just the body, it’s also the mind and the spirit. SOMAVAC made it possible for me to feel like me again, and to be me again."
    ],
    pullQuote: "Healing isn’t just the body. It’s the mind and the spirit. SOMAVAC made it possible for me to feel like me again."
  },
  {
    id: 'kelly-m',
    audience: 'patients',
    category: "A Patient's Story",
    title: "Nope, I Just Wait for the Light!",
    subtitle: "A bilateral mastectomy recovery so easy she didn’t want it to end.",
    author: "Kelly M.",
    role: "Bilateral Mastectomy",
    image: "/brand_assets/testimonials/kelly-m.jpg",
    imageCaption: "Kelly M.",
    readTime: "2 min read",
    video: "https://youtu.be/wKDH6uJMU8Y",
    cardSummary: "Prepared to dread the bulb drains, Kelly was stunned by how simple SOMAVAC made her recovery, and pulled her drains in 9 days.",
    paragraphs: [
      "SOMAVAC made my recovery so much better. The fact that I didn’t have to strip all the nasty stuff, and that I could change the bag by myself, was so nice. My mom had the bulbs and knew they were a struggle. When she saw I was able to use the SOMAVAC by myself, she said, “you don’t need my help??” and I said, “nope! I just wait for the light!”",
      "I even got all the shirts with the special pockets, and I didn’t have to wear any of it, thank goodness, because it was all ugly anyway! I also think I pulled my drains faster. I had them out at 9 days, when they thought it would be 2 weeks with bulbs.",
      "SOMAVAC made my recovery so fast that I didn’t want to go back to work, I wanted some more time! We were out eating pizza as a family after two days. I would absolutely ask for SOMAVAC again. I love that thing! I just didn’t know until I used it."
    ],
    pullQuote: "She said, “you don’t need my help??” and I said, “nope! I just wait for the light!”"
  },

  {
    id: 'jaime-b',
    audience: 'patients',
    category: "A Patient's Story",
    title: "Bulbs Cannot Be Justified Anymore",
    subtitle: "After a second surgery, she refused the bulbs and demanded SOMAVAC.",
    author: "Jaime B.",
    role: "Bilateral Mastectomy",
    image: "/brand_assets/testimonials/jaime-b.jpg",
    imgPos: "50% 22%",
    imageCaption: "Jaime B.",
    readTime: "1 min read",
    video: "https://youtu.be/obbQd6JE3l0",
    cardSummary: "SOMAVAC made Jaime feel free and relaxed during recovery, so when she needed surgery again, she refused to go back to bulbs.",
    paragraphs: [
      "I was given SOMAVAC after my surgery and couldn’t believe how easy it was to use. I felt free, relaxed, and just overall happier during recovery.",
      "Fast forward a few months, when I needed another surgery, my surgeon was going to give me the bulbs, and I refused. I demanded to have SOMAVAC again. The benefits aren’t even debatable. Every surgeon needs to adopt SOMAVAC. Bulbs cannot be justified anymore when something better is out there."
    ],
    pullQuote: "Bulbs cannot be justified anymore when something better is out there."
  },

  {
    id: 'shelley-m',
    audience: 'patients',
    category: "A Patient's Story",
    title: "They. Want. That.",
    subtitle: "Self-contained, automated, and easy, Shelley became the example her whole group now asks for.",
    author: "Shelley M.",
    role: "Bilateral Mastectomy",
    image: "/brand_assets/testimonials/shelley-m.png",
    imageCaption: "Shelley M.",
    readTime: "2 min read",
    cardSummary: "Shelley loved the self-contained belt and the automated suction, and so does everyone she’s told about it.",
    paragraphs: [
      "It was great. I never had the JP drains, but I know they can be cumbersome. I loved that there was a fanny pack / utility belt that was completely self-contained. I really, really loved that. The bags were very easy to change. It was easy for me to sleep with, too, I’m pretty petite, so I just loosened it up at night.",
      "The call center was great. She was really wonderful, and Keith was amazing. It really all worked out. There are several of us in our group now, I shared with them what I had, and they were like, “wow, I really want that.” I loved the way the bags were marked, with big numbers for those who are a little challenged visually.",
      "I slept well. I can’t complain about anything, I’m just grateful I was the one. I loved not having to worry about those “grenades.” I’m really glad it was all automated. It was easy. It was just easy. The sooner you can make SOMAVAC the standard of care, the better."
    ],
    pullQuote: "Everyone I’ve spoken to has said they want that."
  },

  {
    id: 'cindy-l',
    audience: 'patients',
    category: "A Patient's Story",
    title: "So Much Easier Than 22 Years Ago",
    subtitle: "Two cancer journeys, two very different drain experiences.",
    author: "Cindy L.",
    role: "Bilateral Mastectomy",
    image: "/brand_assets/testimonials/cindy-l.jpg",
    imgPos: "50% 12%",
    imageCaption: "Cindy L.",
    readTime: "1 min read",
    cardSummary: "Diagnosed 22 years apart, Cindy compares the cumbersome bulbs of her first surgery to a far easier recovery with SOMAVAC.",
    paragraphs: [
      "I was diagnosed with cancer 22 years ago. Back then, I had the bulb-type drainage system. It was very cumbersome, and I had them for two and a half weeks.",
      "This time around, I had the SOMAVAC. It was so much easier compared to what I had been through in the past. I did everything myself! I didn’t have to worry about pinning up the bulbs, and I definitely got my drains out quicker. I was pleasantly surprised by how much easier it was, a very, very positive experience."
    ],
    pullQuote: "I did everything myself, and I definitely got my drains out quicker."
  },

  {
    id: 'cindy-brca2',
    audience: 'patients',
    category: "A Patient's Story",
    title: "Lucky My Surgeon Knew About SOMAVAC",
    subtitle: "A BRCA2+ patient who managed her own recovery from the very first hours.",
    author: "Cindy",
    role: "BRCA2+ · Double Mastectomy, 2025",
    image: "/brand_assets/bg-woman-reading.jpg",
    imageCaption: "Cindy’s Story",
    readTime: "2 min read",
    cardSummary: "After choosing SOMAVAC over traditional drains, Cindy changed her own collection bags within hours of surgery, and looked forward to the daily support calls.",
    paragraphs: [
      "I am BRCA2+ and had a double mastectomy in December 2025. About three weeks beforehand, my plastic surgeon introduced me to a newer drain device by SOMAVAC. I was told it might allow my drains to be removed sooner and could help reduce the risk of infection compared to traditional drains. After doing some research, seeing what standard drain systems look like, and reading negative comments about them, I decided to go with this device.",
      "Within just a few hours after surgery, I was able to change the collection bag on my own without needing any help. From what I’ve heard from others who had traditional bulb drains, emptying them can be difficult and messy, but this system was very simple and straightforward to use. I developed a routine of changing the bag in the morning after waking up and again before going to bed, but I always watched the lights in case I needed to change them sooner. The bags click easily into the device, and they’re clearly marked with measurement amounts, which makes it easy to track output accurately on the chart provided.",
      "The customer service was amazing, and I looked forward to my daily phone calls where they asked if I had any questions or concerns. Their customer service was available to me 24/7, which provided a lot of comfort. Overall, I found the device very user-friendly and convenient during my recovery. I was so lucky that my plastic surgeon told me about it, because I didn’t have some of the hassles that others have with the traditional bulb drains."
    ],
    pullQuote: "Within just a few hours after surgery, I was able to change the collection bag on my own without needing any help."
  },

  {
    id: 'gwen-c',
    audience: 'patients',
    category: "A Patient's Story",
    title: "Discreet, Easy, Far More Comfortable",
    subtitle: "A hernia-repair patient grateful the innovation arrived when she needed it.",
    author: "Gwen C.",
    role: "Hernia Repair",
    image: "/brand_assets/testimonials/gwen-c.jpg",
    imgPos: "50% 18%",
    imageCaption: "Gwen C.",
    readTime: "1 min read",
    video: "https://youtu.be/pEp0eTY0I3s",
    cardSummary: "One of the first to use SOMAVAC after hernia repair, Gwen found it discreet, easy to manage, and far more comfortable than bulbs.",
    paragraphs: [
      "SOMAVAC was discreet, easy to manage, and far more comfortable than the gross bulbs. The reduced hassle made my recovery smoother and less stressful.",
      "I’m grateful this innovation was available when I needed it."
    ],
    pullQuote: "Discreet, easy to manage, and far more comfortable than the gross bulbs."
  },

  {
    id: 'a-caregivers-story',
    audience: 'caregivers',
    category: "A Caregiver's Story",
    title: "A Caregiver’s Story",
    subtitle: "Clinical evidence reinforces what caregivers experience firsthand.",
    author: "Michael Ker",
    role: "Husband and Caregiver",
    image: "/brand_assets/caregiver-couple.jpg",
    imgPos: "50% 28%",
    imageCaption: "Michael & Kathy",
    readTime: "3 min read",
    cardSummary: "Managing his wife’s post-surgical drains became a countdown. He wishes he’d known about SOMAVAC sooner.",
    paragraphs: [
      "Caring for my wife after her mastectomy was both an act of love and one of the hardest responsibilities I’ve ever faced. Managing her post-surgical drains required constant attention, I emptied, measured, and sanitized them several times a day, carefully watching the color of the discharge for signs of healthy recovery. The drains were uncomfortable to her, so it became a countdown for their removal. It is hard to believe with all the advancements in medicine, patients are still subjected to this rudimentary device for post surgical recovery.",
      "As her caregiver, I found the emotional toll almost as heavy as the physical work. The focus, understandably, is always on the patient, but it can leave the caregiver feeling invisible and overwhelmed. I ran myself ragged trying to keep up, to the point that stress caught up with me, and I came down with shingles. Looking back, I wish I had known about the Somavac device earlier; it would have made drain management much easier and lightened the load both physically and emotionally. Anything that helps lessen the daily burden allows a spouse to be more present, more supportive, and a little less consumed by the demands of care."
    ],
    pullQuote: "Anything that helps lessen the daily burden allows a spouse to be more present, more supportive, and a little less consumed by the demands of care."
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
