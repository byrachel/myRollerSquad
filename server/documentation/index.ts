import api_documentation from "./api_documentation";
import components from "./components";

const info = {
  openapi: "3.0.3",
  info: {
    title: "My Roller Squad API",
    description: "API documentation",
    version: "1.0.0",
    contact: {
      name: "Rachel Nething",
      email: "byrachel@gmail.com",
      url: "",
    },
  },
};

const servers = [
  {
    url: "http://localhost:3000/",
    description: "Local server",
  },
];

const tags = [
  {
    name: "FLOW",
    description: "Publications list",
  },
  {
    name: "USER",
    description: "",
  },
];

const documentation = {
  ...info,
  ...servers,
  ...components,
  ...tags,
  ...api_documentation,
};

export default documentation;
