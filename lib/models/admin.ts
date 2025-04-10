import mongoose, { Schema, models, model } from "mongoose"

const AdminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Admin = models.Admin || model("Admin", AdminSchema)
export default Admin
