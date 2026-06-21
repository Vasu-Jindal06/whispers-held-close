export type WallItem = {
  id: string;
  kind: "letter" | "confession" | "advice" | "truth" | "hope" | "family";
  label: string;
  title?: string;
  body: string;
  author: string;
  tone?: "blush" | "lavender" | "teal" | "gold" | "paper";
  rotate?: number;
  attach?: "paperclip" | "tape" | "tape-corner" | "pin";
  fullLetter?: string;
};

export const wallItems: WallItem[] = [
  {
    id: "1",
    kind: "letter",
    label: "A letter to my mother",
    title: "I was always your daughter — just not the one you imagined.",
    body: "I rehearsed it for three years before I said anything. The version I wrote in my head was cleaner, braver, with better lighting. The real one happened in the kitchen while you were washing rice. You didn't look up for a long time. Then you said 'eat something, the dal is getting cold.' I cried into the bowl. I think that was your way of saying: stay.",
    author: "— Aanya, 27",
    tone: "blush",
    rotate: -1.2,
    attach: "paperclip",
    fullLetter:
      "Ma,\n\nI rehearsed it for three years before I said anything. The version I wrote in my head was cleaner, braver, with better lighting. The real one happened in the kitchen while you were washing rice. You didn't look up for a long time. Then you said 'eat something, the dal is getting cold.' I cried into the bowl. I think that was your way of saying: stay.\n\nWe have not spoken about it again. I don't know if you've told Papa. I don't know if I'm the daughter you wanted, or the one you are still learning to want. But you keep cooking for two when I visit. You ask about her by name now, even if your voice gets quieter on the word girlfriend.\n\nI used to think love had to be loud to count. You have taught me that some loves are dal getting cold in a bowl, and someone making sure I eat.\n\nYour daughter, still and always,\nA.",
  },
  {
    id: "2",
    kind: "confession",
    label: "anonymous",
    body: "I came out at 16 and then went back in for four years. Nobody talks about going back in.",
    author: "anon",
    tone: "paper",
    rotate: 1.5,
    attach: "pin",
  },
  {
    id: "3",
    kind: "advice",
    label: "to my younger self",
    body: "You will not always have to translate yourself. There are rooms where you arrive already understood.",
    author: "— R., 31",
    tone: "lavender",
    rotate: -0.8,
    attach: "tape",
  },
  {
    id: "4",
    kind: "family",
    label: "to my dad",
    title: "The conversation we never had",
    body: "I don't need you to march in a parade. I just need you to ask how he is, the way you ask about my brother's wife. That's the whole sentence. That's all of it.",
    author: "— Anonymous, 24",
    tone: "gold",
    rotate: 0.6,
    attach: "paperclip",
    fullLetter:
      "Pa,\n\nI don't need you to march in a parade. I just need you to ask how he is, the way you ask about my brother's wife. That's the whole sentence. That's all of it.\n\nI know you grew up in a house where men didn't ask each other these things. I'm not asking you to be a different father. I'm asking you to be a slightly more curious one. Just on Sundays. Just over tea.\n\nHe makes me laugh in the morning. He remembers the names of my friends. He has met you once, and he was nervous for a week. That nervousness was love trying to introduce itself.\n\nWhen you're ready,\nYour son.",
  },
  {
    id: "5",
    kind: "truth",
    label: "myth to debunk",
    body: "Bisexual people are not 'halfway' to anything. We are already arrived.",
    author: "— Maya",
    tone: "teal",
    rotate: -1.8,
    attach: "pin",
  },
  {
    id: "6",
    kind: "hope",
    label: "a hope",
    body: "That coming out becomes a small sentence, not a whole event. That one day it sounds like 'I have a partner' and then we move on to lunch.",
    author: "anon",
    tone: "blush",
    rotate: 1.1,
    attach: "tape",
  },
  {
    id: "7",
    kind: "confession",
    label: "anonymous",
    body: "I'm 34 and I still haven't told my grandmother. She's 82 and she calls me her favourite. I tell myself both things are allowed to be true.",
    author: "anon",
    tone: "paper",
    rotate: -0.4,
    attach: "tape-corner",
  },
  {
    id: "8",
    kind: "advice",
    label: "from an ally",
    body: "If your friend comes out to you, don't make it a TED Talk. Make it a Tuesday. Say 'okay. love you. want chai?'",
    author: "— Karan, ally",
    tone: "gold",
    rotate: 1.7,
    attach: "pin",
  },
  {
    id: "9",
    kind: "letter",
    label: "to the version of me at 15",
    title: "You were not too much. They were too small a room.",
    body: "You will spend a long time apologising for taking up space. One day, in a city you haven't been to yet, someone will hand you a cup of coffee and not flinch when you talk about who you love. You will cry a little, quietly, into the foam. That is the moment things change. Wait for it.",
    author: "— J., 29",
    tone: "lavender",
    rotate: -0.6,
    attach: "paperclip",
    fullLetter:
      "Fifteen,\n\nYou will spend a long time apologising for taking up space. For laughing too loud. For caring too much about a song. For looking too long at the girl in the chemistry lab. You will train yourself to be quieter than you are.\n\nOne day, in a city you haven't been to yet, someone will hand you a cup of coffee and not flinch when you talk about who you love. You will cry a little, quietly, into the foam. That is the moment things change. Wait for it.\n\nThe people who tell you you're too much are usually small rooms. You don't have to shrink. You have to find bigger rooms.\n\nLove,\nJ.",
  },
  {
    id: "10",
    kind: "truth",
    label: "one line truth",
    body: "Questioning is a full identity. You do not owe anyone a conclusion.",
    author: "anon",
    tone: "teal",
    rotate: 0.9,
    attach: "pin",
  },
  {
    id: "11",
    kind: "hope",
    label: "a hope",
    body: "That the next generation of queer kids gets to be bored. Gets to have ordinary problems. Gets to be unremarkable.",
    author: "— Sam",
    tone: "blush",
    rotate: -1.4,
    attach: "tape",
  },
  {
    id: "12",
    kind: "family",
    label: "to my sister",
    body: "Thank you for the night you sat outside the bathroom door and didn't say anything, just stayed. I never told you I knew you were there.",
    author: "anon",
    tone: "paper",
    rotate: 1.2,
    attach: "tape-corner",
  },
];

export const categories = [
  { key: "all", label: "Everything" },
  { key: "letter", label: "Letters" },
  { key: "confession", label: "Confessions" },
  { key: "advice", label: "Advice" },
  { key: "truth", label: "Truths" },
  { key: "hope", label: "Hopes" },
  { key: "family", label: "Messages" },
] as const;

export type VoiceBeyond = {
  name: string;
  role: string;
  quote: string;
  context?: string;
};

export const voicesBeyond: VoiceBeyond[] = [
  {
    name: "Sushant Divgikar",
    role: "Performer, singer & queer icon",
    quote: "Placeholder excerpt — to be replaced with a verified, attributed quote before publishing.",
    context: "India",
  },
  {
    name: "Laxmi Narayan Tripathi",
    role: "Transgender rights activist",
    quote: "Placeholder excerpt — to be replaced with a verified, attributed quote before publishing.",
    context: "India",
  },
  {
    name: "Alok Vaid-Menon",
    role: "Writer & performance artist",
    quote: "Placeholder excerpt — to be replaced with a verified, attributed quote before publishing.",
    context: "USA / India",
  },
  {
    name: "Vivek Shraya",
    role: "Artist, musician & author",
    quote: "Placeholder excerpt — to be replaced with a verified, attributed quote before publishing.",
    context: "Canada / India",
  },
  {
    name: "Audre Lorde",
    role: "Poet & civil rights activist",
    quote: "Placeholder excerpt — to be replaced with a verified, attributed quote before publishing.",
    context: "USA · 1934–1992",
  },
];
