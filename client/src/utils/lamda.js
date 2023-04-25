function getTimeDiffString(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const secondsDiff = Math.floor((now - date) / 1000);

  if (secondsDiff === 0) {
    return `Now`;
  }

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

function sortQuestions(questions, condition) {
  if (condition === "popular") {
    questions.sort((before, after) => (before.viewed >= after.viewed ? -1 : 1));
  } else if (condition === "latest") {
    questions.sort((before, after) =>
      new Date(before.createdAt) >= new Date(after.createdAt) ? -1 : 1
    );
  } else if (condition === "oldest") {
    questions.sort((before, after) =>
      new Date(before.createdAt) <= new Date(after.createdAt) ? -1 : 1
    );
  }
  return questions;
}

function filterQuestions(questions, filter) {
  if (filter === "solved") {
    return questions.filter((question) => question.solvedBy !== null);
  } else if (filter === "unsolved") {
    return questions.filter((question) => question.solvedBy === null);
  }
  return questions;
}

function sortAnswers(answers, condition) {
  if (condition === "helpful") {
    answers.sort((before, after) => (before.rating >= after.rating ? -1 : 1));
    const isSolvedIndex = answers.findIndex((answer) => answer.isSolved);
    if (isSolvedIndex !== -1) {
      const [isSolvedItem] = answers.splice(isSolvedIndex, 1);
      answers.unshift(isSolvedItem);
    }
  } else if (condition === "latest") {
    answers.sort((before, after) =>
      new Date(before.createdAt) >= new Date(after.createdAt) ? -1 : 1
    );
  } else if (condition === "oldest") {
    answers.sort((before, after) =>
      new Date(before.createdAt) <= new Date(after.createdAt) ? -1 : 1
    );
  }
  return answers;
}

export {
  getTimeDiffString,
  imageToObjectURL,
  sortQuestions,
  filterQuestions,
  sortAnswers,
};
