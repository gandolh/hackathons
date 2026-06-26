const regEx = /[0-9a-zA-ZăâîșțĂÂÎȘȚ'\-_]{3,}/gi;

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her',
  'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how',
  'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy',
  'did', 'man', 'any', 'too', 'yes', 'yet',
]);

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function sentencesToWords(messageArray) {
  const messages = {};
  for (const message of messageArray) {
    if (!messages[message.msgSender]) messages[message.msgSender] = [];
    messages[message.msgSender].push(message.msgContent);
  }
  return messages;
}

function wordCount(messages) {
  const stats = {};
  for (const key of Object.keys(messages)) {
    const words = messages[key]
      .map(msg => (msg.match(regEx) || []).join(' '))
      .flatMap(msg => msg.split(' '))
      .map(w => w.toLowerCase())
      .filter(w => w.length >= 3 && !STOP_WORDS.has(w))
      .sort();

    stats[key] = {};
    for (let i = 0; i < words.length; i++) {
      stats[key][words[i]] = (stats[key][words[i]] || 0) + 1;
    }
  }
  return stats;
}

function topFiveWords(messageArray) {
  const messages = sentencesToWords(messageArray);
  const stats = wordCount(messages);
  const keys = Object.keys(stats);

  return {
    you: Object.entries(stats[keys[0]] || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({ word, count })),
    other: Object.entries(stats[keys[1]] || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({ word, count })),
  };
}

function messageCount(messageArray) {
  const messages = sentencesToWords(messageArray);
  const keys = Object.keys(messages);
  return {
    title: 'Message Count',
    youValue: String(messages[keys[0]]?.length ?? 0),
    otherValue: String(messages[keys[1]]?.length ?? 0),
    youLabel: keys[0] ?? 'You',
    otherLabel: keys[1] ?? 'Other',
  };
}

function avgResponseTime(messageArray) {
  const averageTime = {};
  for (let i = 0; i < messageArray.length - 1; i++) {
    const sender = messageArray[i + 1].msgSender;
    if (sender !== messageArray[i].msgSender) {
      if (!averageTime[sender]) averageTime[sender] = [];
      averageTime[sender].push(
        (new Date(messageArray[i + 1].msgDate) - new Date(messageArray[i].msgDate)) / 60000
      );
    }
  }
  const keys = Object.keys(averageTime);
  const avg = (arr) => arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : '0';
  return {
    title: 'Avg Response Time',
    youValue: `${avg(averageTime[keys[0]] || [])} min`,
    otherValue: `${avg(averageTime[keys[1]] || [])} min`,
    youLabel: keys[0] ?? 'You',
    otherLabel: keys[1] ?? 'Other',
  };
}

function messagesPerMonth(messageArray) {
  const buckets = {};
  for (const msg of messageArray) {
    const d = new Date(msg.msgDate);
    const key = `${monthNames[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
    if (!buckets[key]) buckets[key] = {};
    buckets[key][msg.msgSender] = (buckets[key][msg.msgSender] || 0) + 1;
  }

  const senders = [...new Set(messageArray.map(m => m.msgSender))];
  const months = Object.keys(buckets);

  return {
    months,
    you: months.map(m => buckets[m][senders[0]] || 0),
    other: months.map(m => buckets[m][senders[1]] || 0),
  };
}

function detectRedFlags(messageArray) {
  const flags = [];
  const senders = [...new Set(messageArray.map(m => m.msgSender))];
  const you = senders[0];
  const other = senders[1];

  // Monologue: 5+ consecutive messages from same sender
  let streak = 1;
  let maxStreak = 1;
  for (let i = 1; i < messageArray.length; i++) {
    if (messageArray[i].msgSender === messageArray[i - 1].msgSender) {
      streak++;
      maxStreak = Math.max(maxStreak, streak);
    } else {
      streak = 1;
    }
  }
  if (maxStreak >= 5) {
    flags.push(`Longest un-interrupted monologue: ${maxStreak} messages.`);
  }

  // Count imbalance
  const counts = sentencesToWords(messageArray);
  const youCount = counts[you]?.length || 0;
  const otherCount = counts[other]?.length || 0;
  const total = youCount + otherCount;
  if (total > 0 && Math.abs(youCount - otherCount) / total > 0.3) {
    const more = youCount > otherCount ? you : other;
    const pct = Math.round((Math.max(youCount, otherCount) / total) * 100);
    flags.push(`One-sided conversation: ${more} sent ${pct}% of messages.`);
  }

  // Long gaps (ghost)
  let ghostCount = 0;
  for (let i = 1; i < messageArray.length; i++) {
    const gap = (new Date(messageArray[i].msgDate) - new Date(messageArray[i - 1].msgDate)) / 3600000;
    if (gap > 24) ghostCount++;
  }
  if (ghostCount > 0) {
    flags.push(`Went silent for 24+ hours on ${ghostCount} occasion(s).`);
  }

  return flags.length ? flags : ['No red flags detected. Healthy yapping!'];
}

function buildDashboard(messageArray) {
  return {
    comparisons: [messageCount(messageArray), avgResponseTime(messageArray)],
    topWords: topFiveWords(messageArray),
    messagesPerMonth: messagesPerMonth(messageArray),
    redFlags: detectRedFlags(messageArray),
  };
}

module.exports = { buildDashboard };
