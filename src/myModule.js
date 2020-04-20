const message = "Some message from myModule.js";

const name = "Charlie";

const location = "Chicago";

const getGreeting = name => {
  return `Welcome to the course ${name}`;
};

export { message, name, getGreeting, location as default };
