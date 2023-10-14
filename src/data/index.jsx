import { faker } from "@faker-js/faker";
import {
  ChatCircleDots,
  Gear,
  GearSix,
  Phone,
  SignOut,
  User,
  Users,
} from "phosphor-react";

const Profile_Menu = [
  {
    title: "Profile",
    icon: <User size={20} />,
  },
  {
    title: "Settings",
    icon: <Gear size={20} />,
  },
  {
    title: "Log out",
    icon: <SignOut size={20} />,
  },
];

const Nav_Buttons = [
  {
    index: 0,
    icon: <ChatCircleDots />,
    to: "/app",
    title: "Chats",
  },
  {
    index: 1,
    icon: <Users />,
    to: "/groups",
    title: "Groups",
  },
  {
    index: 2,
    icon: <Phone />,
    to: "/calls",
    title: "Calls",
  },
  {
    index: 3,
    icon: <Gear />,
    to: "/settings",
    title: "Settings",
  },
];

const Nav_Setting = [
  {
    index: 3,
    icon: <GearSix />,
  },
];

const ChatList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "9:36",
    unread: 0,
    pinned: true,
    online: true,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "12:02",
    unread: 2,
    pinned: true,
    online: false,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "10:35",
    unread: 3,
    pinned: false,
    online: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "04:00",
    unread: 0,
    pinned: false,
    online: true,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
];

const Chat_History = [
  {
    type: "msg",
    message: "Hi 👋🏻, How are ya ?",
    incoming: true,
    outgoing: false,
  },
  {
    type: "divider",
    text: "Today",
  },
  {
    type: "msg",
    message: "Hi 👋 Panda, not bad, u ?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Can you send me an abstarct image?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Ya sure, sending you a pic",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "img",
    message: "Here You Go",
    img: faker.image.abstract(),
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "img",
    message: "Now see mine.",
    img: faker.image.abstract(),
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Can you please send this in file format?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go. 1",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that 2",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "reply",
    reply: "This is a reply",
    message: "Yep, I can also do that",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "reply",
    reply: "This is a reply 2",
    message: "Yep, I can also do that 2",
    incoming: true,
    outgoing: false,
  },
];

export const SHARED_links = [
  {
    type: "msg",
    subtype: "link",
    // preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that 2",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    // preview: faker.image.cats(),
    message: "Yep, I can also do that 2",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "link",
    // preview: faker.image.cats(),
    message: "Yep, I can also do that 2",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    // preview: faker.image.cats(),
    message: "Yep, I can also do that 2",
    incoming: false,
    outgoing: true,
  },
];

export const SHARED_docs = [
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go. 1",
    name: "Invoice 22 Oct",
    incoming: false,
    outgoing: true,
    type: "image",
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go. 1",
    name: "Last night party",
    incoming: false,
    outgoing: true,
    type: "video",
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go. 1",
    name: "Basic math courses",
    incoming: false,
    outgoing: true,
    type: "word",
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go. 1",
    name: "College thesis",
    incoming: false,
    outgoing: true,
    type: "pdf",
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go. 1",
    name: "Sales Report",
    incoming: false,
    outgoing: true,
    type: "excel",
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go. 1",
    name: "Booked Ticket",
    incoming: false,
    outgoing: true,
    type: "powerpoint",
  },
];

const Message_options = [
  {
    title: "Reply",
  },
  {
    title: "React to message",
  },
  {
    title: "Forward message",
  },
  {
    title: "Star message",
  },
  {
    title: "Report",
  },
  {
    title: "Delete Message",
  },
];

export const calls_data = [
  {
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    date: `${faker.date.weekday()}, 21:43`,
    missed: true,
    incoming: false,
  },
  {
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    date: `${faker.date.weekday()}, 21:43`,
    status: "denied",
    missed: true,
    incoming: true,
  },
  {
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    date: `${faker.date.weekday()}, 21:43`,
    status: "denied",
    missed: false,
    incoming: false,
  },
  {
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    date: `${faker.date.weekday()}, 21:43`,
    status: "answered",
    missed: true,
    incoming: false,
  },
  {
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    date: `${faker.date.weekday()}, 21:43`,
    status: "denied",
    missed: true,
    incoming: false,
  },
  {
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    date: `${faker.date.weekday()}, 21:43`,
    status: "answered",
    missed: false,
    incoming: true,
  },
  {
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    date: `${faker.date.weekday()}, 21:43`,
    status: "answered",
    missed: false,
    incoming: false,
  },
];

export {
  Profile_Menu,
  Nav_Setting,
  Nav_Buttons,
  ChatList,
  Chat_History,
  Message_options,
};
