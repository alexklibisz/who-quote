
module.exports.autoPK = false;

module.exports.attributes = {

  name: {
    type: 'string',
    required: true
  },

  twitterId: {
    type: 'string',
    required: true,
    primaryKey: true
  },

  twitterHandle: {
    type: 'string',
    required: true
  },

  category: {
    model: 'Category',
    required: true
  },

  imageURL: {
    type: 'String'
  }

};

module.exports.syncWithTwitter = async function syncWithTwitter({ twitterId }) {
  const
    profile = await TwitterService.getUserProfile({ twitterId }),
    speaker = await Speaker.update(twitterId, {
      twitterHandle: profile.screen_name,
      name: profile.name,
      imageURL: profile.profile_image_url.replace('normal', 'bigger')
    });
};
