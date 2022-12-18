const mongoose = require("mongoose");

// Make Schema of Model before making Model
const UserSchema = new mongoose.Schema(
	{
		// Wonder which data types can be used for Mongoose Scheme see this: https://mongoosejs.com/docs/schematypes.html
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String, required: true },
		passwordResetCode: { type: String },
		isAdmin: {
			type: Boolean,
			default: false,
		},
		isVerified: { type: Boolean, default: false },
		verificationString: { type: String }
	},
	// Timestamp automatically create Created at and Updated at Field for the Model, date time is data type for both field
	// For reference: https://masteringjs.io/tutorials/mongoose/timestamps#:~:text=Mongoose%20schemas%20have%20a%20timestamps,timestamps%20on%20a%20User%20model.&text=When%20you%20enable%20timestamps%2C%20Mongoose,updatedAt%20properties%20to%20your%20schema.
	{ timestamps: true }
);

//Model function model require "Model Name" : 1st Argument and Scheme Name as Second Argument
// Model name should be Singular and it is automatically chnaged to plural
module.exports = mongoose.model("User", UserSchema);