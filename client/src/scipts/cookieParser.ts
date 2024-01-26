import cookie from "cookie";

export default function parseCookies(req: { headers: { cookie: any } }) {
  return cookie.parse(req ? `${req.headers.cookie}` : document.cookie);
}
