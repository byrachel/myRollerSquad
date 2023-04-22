import { withSessionRoute } from "@/server/middleware/auth/withSession";

export default withSessionRoute(async (req, res) => {
  req.session.destroy();
  return res.status(200);
});
