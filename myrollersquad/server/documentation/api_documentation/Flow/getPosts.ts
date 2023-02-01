const getPosts = {
  get: {
    tags: ["FLOW"],
    description: "Flow : Publications list",
    operationId: "",
    parameters: [],
    responses: {
      200: {
        description: "Array of posts",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/post",
            },
          },
        },
      },
    },
  },
};
export default getPosts;
