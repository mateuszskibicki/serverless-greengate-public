const { TextHelper, SmallTextHelper, UrlHelper } = require("./prismicHelpers");

module.exports.allUsersHelper = data => {
  if (!data) return null;

  const usersArray = data.results;

  return usersArray.map(user => {
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
  });
};

module.exports.singleUserHelper = data => {
  if (!data) return null;

  return {
    uid: data.uid,
    name: TextHelper(data.data.name),
    email: TextHelper(data.data.email),
    phone_number: TextHelper(user.data.phone_number),
    description: TextHelper(data.data.description),
    profession: TextHelper(data.data.profession),
    company: TextHelper(data.data.company),
    is_admin: SmallTextHelper(data.data.is_admin) === "yes" ? true : false,
    is_super_admin:
      SmallTextHelper(data.data.is_super_admin) === "yes" ? true : false,
    image: UrlHelper(data.data.image)
  };
};
