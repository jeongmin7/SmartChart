module.exports = async (req, res) => {
  const { query } = req;

  let destination = "http://13.125.227.145:8080/auth/kakao/callback";

  if (query.someParameter) {
    destination = `https://smartchart.vercel.app/auth/kakao/callback?code=${query.code}`;
  }

  res.writeHead(301, { Location: destination });
  res.end();
};
