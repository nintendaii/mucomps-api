import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { salt } from "../../config";

export interface UserDocument extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  let user = this as UserDocument;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return;

  // Random additional data
  const saltFactor = await bcrypt.genSalt(salt);

  const hash = bcrypt.hashSync(user.password, saltFactor);

  // Replace the password with the hash
  user.password = hash;
  return;
});

// Used for logging in
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
