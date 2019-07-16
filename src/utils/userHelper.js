const { TextHelper, SmallTextHelper, UrlHelper } = require("./prismicHelpers");

module.exports = async ({ userUID, prismicConnection }) => {
  if (!userUID || !prismicConnection) return null;

  const user = await prismicConnection.getByUID("user", userUID);

  if (!user) return null;

  return {
    uid: user.uid,
    name: TextHelper(user.data.name),
    email: TextHelper(user.data.email),
    phone_number: TextHelper(user.data.phone_number),
    description: TextHelper(user.data.description),
    profession: TextHelper(user.data.profession),
    company: TextHelper(user.data.company),
    is_admin: SmallTextHelper(user.data.is_admin) === "yes" ? true : false,
    is_super_admin:
      SmallTextHelper(user.data.is_super_admin) === "yes" ? true : false,
    image: UrlHelper(user.data.image)
  };
};
