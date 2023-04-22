function getTimeDiffString(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const secondsDiff = Math.floor((now - date) / 1000);

  if (secondsDiff < 60) {
    return `${secondsDiff} seconds ago`;
  }

  const minutesDiff = Math.floor(secondsDiff / 60);

  if (minutesDiff < 60) {
    return `${minutesDiff} minutes ago`;
  }

  const hoursDiff = Math.floor(minutesDiff / 60);

  if (hoursDiff < 24) {
    return `${hoursDiff} hours ago`;
  }

  const daysDiff = Math.floor(hoursDiff / 24);

  if (daysDiff < 7) {
    return `${daysDiff} days ago`;
  }

  const weeksDiff = Math.floor(daysDiff / 7);

  if (weeksDiff < 4) {
    return `${weeksDiff} weeks ago`;
  }

  const monthsDiff = Math.floor(daysDiff / 30);

  if (monthsDiff < 12) {
    return `${monthsDiff} months ago`;
  }

  const yearsDiff = Math.floor(daysDiff / 365);

  return `${yearsDiff} years ago`;
}

function imageToObjectURL(imageArg) {
  if (typeof imageArg !== "object") {
    return imageArg;
  } else if (imageArg) {
    return URL.createObjectURL(imageArg);
  }
}

export { getTimeDiffString, imageToObjectURL };
