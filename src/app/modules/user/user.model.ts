import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: 0 },
    needPasswordChange: { type: Boolean, default: true },
    passwordChangedAt: { type: Date },
    role: { type: String, enum: ['admin', 'faculty', 'student'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// use pre hook or middleware for hashing password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  // hashing password and save in db
  user.password = await bcrypt.hash(user.password, Number(config.saltRound));
  next();
});

// set "" after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// checking if user is exist
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

// checking if password is matched
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

// checking jwtTimestamp and passwordChangeTimestamp
userSchema.statics.isJwtIssuedBeforePasswordChange = function (
  passwordChangeTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangeTime = new Date(passwordChangeTimestamp).getTime() / 1000;
  return passwordChangeTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
