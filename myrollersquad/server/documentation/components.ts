const components = {
  components: {
    schemas: {
      id: {
        type: "number",
      },
      post: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          title: {
            type: "string",
            description: "String limited to 100 chars",
            example: "My Roller Session of the day !",
          },
        },
      },
    },
  },
};

export default components;
