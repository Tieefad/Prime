import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_nfp8vkd";
const TEMPLATE_ID = "template_8o2x3pk";
const PUBLIC_KEY = "mcMCAGZkyudsngUZu";

export const sendBookingConfirmation = async ({
  userEmail,
  userName,
  eventTitle,
  eventLocation,
  eventDate,
  seats,
  totalAmount,
}) => {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        email: userEmail,
        user_name: userName,
        event_title: eventTitle,
        event_location: eventLocation,
        event_date: eventDate,
        seats: seats.join(", "),
        total_amount: totalAmount,
      },
      PUBLIC_KEY
    );
    console.log("Email sent!");
    return true;
  } catch (err) {
    console.error("Email error:", err);
    return false;
  }
};