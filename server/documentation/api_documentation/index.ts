import getPosts from "./Flow/getPosts";

const api_documentation = {
  paths: {
    "/api/flow": {
      tags: "FLOW",
      ...getPosts,
    },
    "/user": {
      tags: "USER",
    },
  },
};

export default api_documentation;
