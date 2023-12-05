module.exports = async (req, res) => {
  const { query } = req;

  let destination = `${process.env.REACT_APP_API_KAKAO_REDIRECT_URL}`;

  if (query.code) {
    destination = `${process.env.REACT_APP_API_KAKAO_URL}?code=${query.code}`;
  }

  res.writeHead(302, { Location: destination });
  res.end();
};
