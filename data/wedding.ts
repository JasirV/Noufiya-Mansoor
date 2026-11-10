export type WeddingData = {
  couple: {
    names: string;
    date: string;
    fullDate: string;
    time: string;
    timezone: string;
  };
  invitation: {
    togetherWith: string;
    title: string;
    subtitle: string;
    storyHeading: string;
    storyBody: string[];
    closing: string;
    footer: string;
  };
  venue: {
    name: string;
    address: string;
    googleMapsUrl: string;
    embedUrl: string;
  };
};

export const WeddingData: WeddingData = {
  couple: {
    names: "Noufiya & Mansoor",
    date: "15 November 2026",
    fullDate: "2026-11-15T12:00:00",
    time: "12:00 PM",
    timezone: "Asia/Kolkata",
  },
  invitation: {
    togetherWith: "Together with their families",
    title: "Noufiya & Mansoor",
    subtitle: "Joyfully invite you to celebrate their wedding",
    storyHeading: "Two hearts, one beautiful journey.",
    storyBody: [
      "The journey that began with a glance grew into something neither of us could have imagined. Through quiet evenings, shared laughter, and the realisation that home lives wherever we are together, we found a love worth celebrating.",
      "We are so happy to formally invite you to witness and bless our union — your presence will mean everything to us as we begin this new chapter.",
      "Thank you for being part of our story. Your love and support have been with us all along.",
    ],
    closing: "We would be delighted to have you join us and bless our new beginning.",
    footer: "Made with love \u2013 Noufiya & Mansoor",
  },
  venue: {
    name: "Dhofar Convention Centre",
    address: "QX6P+J45, Bharathanoor, Keralam 695609",
    googleMapsUrl:
      "https://www.google.com/maps?q=QX6P+J45+Dhofar+Convention+centre,+Bharathanoor,+Keralam+695609&ftid=0x3b05c53daf075287:0x4a8390aa404669dc&entry=gps&shh=CAE&lucs=,94297699,94231188,100821559,47071704,100809208,94218641,94282134,100835699,100840646,94286869,100820247,100822504,100838877,121816461,100798793&g_ep=CAISEjI2LjQ0LjQuMDA2ODc3NDIxMBgAIIgnKpABLDk0Mjk3Njk5LDk0MjMxMTg4LDEwMDgyMTU1OSw0NzA3MTcwNCwxMDA4MDkyMDgsOTQyMTg2NDEsOTQyODIxMzQsMTAwODM1Njk5LDEwMDg0MDY0Niw5NDI4Njg2OSwxMDA4MjAyNDcsMTAwODIyNTA0LDEwMDgzODg3NywxMjE4MTY0NjEsMTAwNzk4NzkzQgJJTg%3D%3D&skid=9afae080-0cdd-44af-b7a9-1b72c513a5dc&g_st=iw",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.864722521949!2d76.9826828758836!3d8.761503191289895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05c53daf075287%3A0x4a8390aa404669dc!2sDhofar%20Convention%20centre!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  },
};

export default WeddingData;
