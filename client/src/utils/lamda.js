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

function formatDate(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
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

function searchQuestions(questions, query) {
  const searchedQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query)
  );
  return searchedQuestions;
}

function searchTags(tags, query) {
  const searchedTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(query)
  );
  return searchedTags;
}

function searchUsers(users, query) {
  const searchedUsers = users.filter((users) =>
    users.username.toLowerCase().includes(query)
  );
  return searchedUsers;
}

function validateUsername(username) {
  const regex = /^[a-zA-Z0-9_]{6,}$/;
  return regex.test(username);
}

function validatePassword(password) {
  const regex = /^(?=.*[a-zA-Z]{2})(?=.*\d{2})[a-zA-Z][a-zA-Z0-9_]{8,}$/;
  return regex.test(password);
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export {
  getTimeDiffString,
  imageToObjectURL,
  formatDate,
  validateUsername,
  validatePassword,
  validateEmail,
  sortQuestions,
  filterQuestions,
  sortAnswers,
  searchQuestions,
  searchTags,
  searchUsers,
};
