const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
	Query: {
		me: async (parent, { userId }) => {
			return User.findOne({ _id: userId });
		},
		users: async () => {
			return User.find();
		},
	},

	Mutation: {
		addUser: async (parent, { username, email, password }) => {
			console.log(`username: ${username}, email: ${email}, password: ${password}`)

			try {
				const user = await User.create({ username, email, password });
				console.log('user created: ', user)
				const token = signToken(user);
				console.log('token created: ', token);

				return { token, user };
			} catch (err) {
				console.log(err.message);
				throw err
			}
		},

		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw AuthenticationError;
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw AuthenticationError;
			}

			const token = signToken(user);
			return { token, user };
		},

		saveBook: async (parent, { userId, bookId, authors, description, title, image, link }) => {
			try {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: userId },
				{ 
				$addToSet: { 
					savedBooks: {
					bookId,
					authors,
					description,
					title,
					image,
					link
					} 
				} 
				},
				{ new: true, runValidators: true }
			);
			return updatedUser;
			} catch (err) {
			console.log(err);
			throw new Error('Could not save book');
			}
		},

		removeBook: async (parent, { userId, bookId }) => {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: userId },
				{ $pull: { savedBooks: { bookId: bookId } } },
				{ new: true }
			);
			if (!updatedUser) {
				throw new Error('Could not find user with this id!');
			}
			return updatedUser;
		},
	}
};

module.exports = resolvers;