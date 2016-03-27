
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
  }

};
