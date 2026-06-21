export type WallItem = {
  id: string;
  kind: "letter" | "confession" | "advice" | "truth" | "hope" | "family";
  label: string;
  title?: string;
  body: string;
  author: string;
  tone?: "blush" | "lavender" | "teal" | "gold" | "paper";
  rotate?: number;
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
  },
  {
    id: "2",
    kind: "confession",
    label: "anonymous",
    body: "I came out at 16 and then went back in for four years. Nobody talks about going back in.",
    author: "anon",
    tone: "paper",
    rotate: 1.5,
  },
  {
    id: "3",
    kind: "advice",
    label: "to my younger self",
    body: "You will not always have to translate yourself. There are rooms where you arrive already understood.",
    author: "— R., 31",
    tone: "lavender",
    rotate: -0.8,
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
  },
  {
    id: "5",
    kind: "truth",
    label: "myth to debunk",
    body: "Bisexual people are not 'halfway' to anything. We are already arrived.",
    author: "— Maya",
    tone: "teal",
    rotate: -1.8,
  },
  {
    id: "6",
    kind: "hope",
    label: "a hope",
    body: "That coming out becomes a small sentence, not a whole event. That one day it sounds like 'I have a partner' and then we move on to lunch.",
    author: "anon",
    tone: "blush",
    rotate: 1.1,
  },
  {
    id: "7",
    kind: "confession",
    label: "anonymous",
    body: "I'm 34 and I still haven't told my grandmother. She's 82 and she calls me her favourite. I tell myself both things are allowed to be true.",
    author: "anon",
    tone: "paper",
    rotate: -0.4,
  },
  {
    id: "8",
    kind: "advice",
    label: "from an ally",
    body: "If your friend comes out to you, don't make it a TED Talk. Make it a Tuesday. Say 'okay. love you. want chai?'",
    author: "— Karan, ally",
    tone: "gold",
    rotate: 1.7,
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
  },
  {
    id: "10",
    kind: "truth",
    label: "one line truth",
    body: "Questioning is a full identity. You do not owe anyone a conclusion.",
    author: "anon",
    tone: "teal",
    rotate: 0.9,
  },
  {
    id: "11",
    kind: "hope",
    label: "a hope",
    body: "That the next generation of queer kids gets to be bored. Gets to have ordinary problems. Gets to be unremarkable.",
    author: "— Sam",
    tone: "blush",
    rotate: -1.4,
  },
  {
    id: "12",
    kind: "family",
    label: "to my sister",
    body: "Thank you for the night you sat outside the bathroom door and didn't say anything, just stayed. I never told you I knew you were there.",
    author: "anon",
    tone: "paper",
    rotate: 1.2,
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
