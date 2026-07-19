import moment from "moment";

export function parseWapp(inputString: string) {
  const lines = inputString.split("\n");
  const messages: { msgDate: string; msgSender: string; msgContent: string }[] = [];

  let currentMessage: { msgDate: string; msgSender: string; msgContent: string } | null = null;

  const dateRegex = /^\d{2}\.\d{2}\.\d{4}, \d{2}:\d{2} - /; // Matches the timestamp at the start

  for (let line of lines) {
    if (dateRegex.test(line)) {
      // New message starts
      const [datePart, timePart, ...rest] = line.split(" ");
      const msgDate = moment(`${datePart.slice(0, -1)} ${timePart}`, "DD.MM.YYYY HH:mm").toISOString();

      const senderAndContent = rest.join(" ").split(": ");
      if (senderAndContent.length < 2) continue; // Skip malformed messages

      const msgSender = senderAndContent[0].replace('-', '').trim();
      const msgContent = senderAndContent.slice(1).join(": "); // Handle messages containing ":"

      if (currentMessage) {
        messages.push(currentMessage); // Save previous message
      }

      currentMessage = { msgDate, msgSender, msgContent };
    } else if (currentMessage) {
      // Multiline message, append to last message
      currentMessage.msgContent += "\n" + line;
    }
  }

  if (currentMessage) {
    messages.push(currentMessage);
  }

  // Filter out media messages
  return messages.filter(msg => !msg.msgContent.includes("<Media omitted>"));
}
