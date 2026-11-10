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
    fullDate: "2026-11-15T15:00:00",
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
    name: "Wedding Venue",
    address: "Add actual wedding address",
    googleMapsUrl: "https://maps.google.com/?q=Add+actual+wedding+location",
    // Placeholder embed centered on Connaught Place, New Delhi.
    // Replace with the real venue's embed URL once the location is confirmed.
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d77.20900911468404!3d28.61393237945529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fe6666588de89%3A0x238f7e4c7e3e1f84!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin",
  },
};

export default WeddingData;
