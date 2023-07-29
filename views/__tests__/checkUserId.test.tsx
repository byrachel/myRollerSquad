import { NextApiRequest, NextApiResponse } from "next";
import { checkUserId } from "@/server/controllers/checkUser";
import { getServerSession } from "next-auth/next";

jest.mock("next-auth/server");

describe("checkUserId", () => {
  let req: NextApiRequest;
  let res: NextApiResponse;

  beforeEach(() => {
    req = {
      query: {},
    } as NextApiRequest;
    res = {} as NextApiResponse;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return null if session or user is missing", async () => {
    (getServerSession as jest.Mock).mockResolvedValue(null);

    const result = await checkUserId(req, res);

    expect(result).toBeNull();
    expect(getServerSession).toHaveBeenCalled();
  });

  // Other test cases...
});
