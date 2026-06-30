// Story spread data for "The Goodest Good News"
// Each entry maps to a page spread image and its narration audio.

export type SpreadType = 'cover' | 'spread' | 'back_cover';
export type StoryMode = 'read-to-me' | 'read-myself';

export interface StorySpread {
  id: string;
  type: SpreadType;
  title: string;
  image: ReturnType<typeof require>;
  narration: ReturnType<typeof require> | null;
  text: string;
  // mode is set at runtime from navigation params, not stored per-spread
}

export const storyData: StorySpread[] = [
  {
    id: 'cover',
    type: 'cover',
    title: 'Cover',
    image: require('../assets/images/Cover_GGN.jpg'),
    narration: null,
    text: '',
  },
  {
    id: 'spread-01-02',
    type: 'spread',
    title: 'Pages 1–2',
    image: require('../assets/images/page_1-2_GGN.jpg'),
    narration: require('../assets/sounds/Narration_1-2.m4a'),
    text: 'If you can see stars and mountains and trees,\nI bet you\'ve no doubt that a God made these.\n\nOr perhaps someone told you, maybe Mom or Dad,\nThat a God up above has the world in His hand.',
  },
  {
    id: 'spread-03-04',
    type: 'spread',
    title: 'Pages 3–4',
    image: require('../assets/images/page_3-4_GGN.jpg'),
    narration: require('../assets/sounds/Narration_3-4.m4a'),
    text: 'This God is good. Wait, no — better than good!\nHe is HOLY which means He\'s the goodest of good!\nThere is no one like Him. No one. Nowhere.\nHe rules from heaven — He\'s the King of Everywhere.\n\nAnd not only that, this good God is a Maker;\nNot just any old maker; the Maker of makers!\nHe made trees and bees and oceans and T-Rex\'s.\nHe made it all… even the mosquitos in Texas.',
  },
  {
    id: 'spread-05-06',
    type: 'spread',
    title: 'Pages 5–6',
    image: require('../assets/images/page_5-6_GGN.jpg'),
    narration: require('../assets/sounds/Narration_5-6.m4a'),
    text: 'This of course includes you, wherever you are;\nGod made you and sees you, wherever you are.',
  },
  {
    id: 'spread-07-08',
    type: 'spread',
    title: 'Pages 7–8',
    image: require('../assets/images/page_7-8_GGN.jpg'),
    narration: require('../assets/sounds/Narration_7-8.m4a'),
    text: 'Speaking of you, what do you think about you?\nDo you understand WHAT God has made YOU to do?\nHe\'s made you for more than sleeping and playing.\nHe\'s made you for more than even dragon-slaying.\n\nYes for you He\'s had plans from the very start,\nThat you\'d love Him and serve Him with all of your heart.\nTo know Him, and trust Him, and love Him forever\nIs the way to be happy — whenever, wherever.',
  },
  {
    id: 'spread-09-10',
    type: 'spread',
    title: 'Pages 9–10',
    image: require('../assets/images/page_9-10_GGN.jpg'),
    narration: require('../assets/sounds/Narration_9-10.m4a'),
    text: 'But here\'s the problem: I bet you\'re like me,\nIn that rather than God, I tend to love me.\nI put myself first and ignore God\'s Word;\nI don\'t give Him the love that He deserves.\n\nAnd that may not seem like a big deal to you,\nBut to say \'No!\' to God is the worst we could do.\nSo because we are people that go our own way,\nIt is right that someday God will send us away.',
  },
  {
    id: 'spread-11-12',
    type: 'spread',
    title: 'Pages 11–12',
    image: require('../assets/images/page_11-12_GGN.jpg'),
    narration: require('../assets/sounds/Narration_11-12.m4a'),
    text: 'Unless, that is, there\'s another way\nTo be happy forever and NOT sent away…',
  },
  {
    id: 'spread-13-14',
    type: 'spread',
    title: 'Pages 13–14',
    image: require('../assets/images/page_13-14_GGN.jpg'),
    narration: require('../assets/sounds/Narration_13-14.m4a'),
    text: 'Well guess what! Good news! This God who sees us?\nHas a plan to save us, and His name is Jesus.',
  },
  {
    id: 'spread-15-16',
    type: 'spread',
    title: 'Pages 15–16',
    image: require('../assets/images/page_15-16_GGN.jpg'),
    narration: require('../assets/sounds/Narration_15-16.m4a'),
    text: 'Perfectly perfect, this Man was from the start,\nLoving God and man with every inch of his heart.\nHealing the sick and giving sight to the blind,\nThe only. man. ever. who didn\'t deserve to die.',
  },
  {
    id: 'spread-17-18',
    type: 'spread',
    title: 'Pages 17–18',
    image: require('../assets/images/page_17-18_GGN.jpg'),
    narration: require('../assets/sounds/Narration_17-18.m4a'),
    text: 'But… avoiding pain and death was never his plan,\nfor he came to die in the place of sinful man.\nSo that we would not have to die and be lost\nHe suffered for us through his death on the cross.\n\n\'It is finished!\' he shouted right before he died,\nThe punishment for sin His blood had supplied.',
  },
  {
    id: 'spread-19-20',
    type: 'spread',
    title: 'Pages 19–20',
    image: require('../assets/images/page_19-20_GGN.jpg'),
    narration: require('../assets/sounds/Narration_19-20.m4a'),
    text: 'Now I wouldn\'t be surprised if this story has you sad.\nAnd maybe you\'re thinking: \'it\'s NOT GOOD, IT\'S BAD!\'\n\nBut the story\'s not over. Jesus didn\'t stay dead.\nNo, three days later He rose from the dead.',
  },
  {
    id: 'spread-21-22',
    type: 'spread',
    title: 'Pages 21–22',
    image: require('../assets/images/page_21-22_GGN.jpg'),
    narration: require('../assets/sounds/Narration_21-22.m4a'),
    text: 'That\'s right, Jesus lives, he conquered the grave!\nAnd now he\'s in heaven as the Savior who saves.\n\nSo, of course, to follow Him is the life we choose,\nAnd His story we call \'The Goodest Good News!\'',
  },
  {
    id: 'spread-23-24',
    type: 'spread',
    title: 'Pages 23–24',
    image: require('../assets/images/page_23-24_GGN.jpg'),
    narration: require('../assets/sounds/Narration_23-24.m4a'),
    text: 'Well…\n\nIf you believe this story right now where you\'re at\nThen it sounds to me like you are on the right track.\n\nYou may not be as big and tall as the rest,\nBut a believer you are never-the-less.\nAnd I bet as you grow and your legs get longer\nYour love for Jesus will get deeper and stronger.\n\nSo read your Bible (if you can)\nOr have someone read it to you,\nAnd listen to Words written\nAbout the God who came to save you.',
  },
  {
    id: 'back-cover',
    type: 'back_cover',
    title: 'Back Cover',
    image: require('../assets/images/back_cover_GGN.jpg'),
    narration: null,
    text: '',
  },
];
