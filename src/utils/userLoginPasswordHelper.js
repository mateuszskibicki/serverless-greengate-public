const Prismic = require("prismic-javascript");
const { TextHelper, SmallTextHelper, UrlHelper } = require("./prismicHelpers");

module.exports = async ({ email, password, prismicConnection }) => {
  // check if email and password
  if (!email || !password) return null;

  //check if user with email exists
  const user = await prismicConnection.query(
    Prismic.Predicates.fulltext("my.user.email", email)
  );

  //if no return null
  if (!user || !user.results || !user.results.length > 0) return null;

  //if email is wrong return null
  if (TextHelper(user.results[0].data.email) !== email) return null;

  //if password is wrong return null
  if (TextHelper(user.results[0].data.password) !== password) return null;

  //if data is correct, return user object and put into redux store
  return {
    uid: user.results[0].uid,
    name: TextHelper(user.results[0].data.name),
    email: TextHelper(user.results[0].data.email),
    phone_number: TextHelper(user.results[0].data.phone_number),
    description: TextHelper(user.results[0].data.description),
    profession: TextHelper(user.results[0].data.profession),
    company: TextHelper(user.results[0].data.company),
    is_admin:
      SmallTextHelper(user.results[0].data.is_admin) === "yes" ? true : false,
    is_super_admin:
      SmallTextHelper(user.results[0].data.is_super_admin) === "yes"
        ? true
        : false,
    image: UrlHelper(user.results[0].data.image)
  };
};
