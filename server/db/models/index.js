const User = require('./user');
const Restaurant = require('./restaurant');
const Review = require('./review');
const Like = require('./like');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Restaurant.hasMany(Review);
Review.belongsTo(Restaurant);

User.hasMany(Like);
Like.belongsTo(User);
Restaurant.hasMany(Like);
Like.belongsTo(Restaurant);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Restaurant, Review, Like
}
