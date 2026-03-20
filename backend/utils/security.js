const BAD_WORDS = ['spam', 'abuse', 'hate', 'badword', 'swearword', 'idiot', 'stupid'];

const filterProfanity = (text) => {
  if (!text) return text;
  let filtered = text;
  BAD_WORDS.forEach((word) => {
    // Replace whole words, case insensitive
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    filtered = filtered.replace(regex, '***');
  });
  return filtered;
};

module.exports = {
  filterProfanity
};
