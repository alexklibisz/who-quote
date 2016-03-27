module.exports.attributes = {

  category: {
    model: 'Category',
    required: true
  },

  speaker: {
    model: 'Speaker',
    required: true
  },

  text: {
    type: 'string',
    required: true
  },

  sourceURL: {
    type: 'string',
    required: true
  }

};
