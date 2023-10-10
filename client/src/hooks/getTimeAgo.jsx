export const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
  const now = new Date();
  const timeDifference = now - date;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours >= 24) {
    // If more than 24 hours, display the actual date
    return date.toLocaleDateString();
  } else if (hours >= 1) {
    // Display hours ago
    return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
  } else if (minutes >= 1) {
    // Display minutes ago
    return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
  } else {
    // Display seconds ago
    return seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`;
  }
};
