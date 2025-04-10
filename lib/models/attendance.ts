import mongoose, { Schema, Document, Model } from 'mongoose'

interface IAttendance extends Document {
  fingerprintId: string
  temperature: number
  timestamp: Date
}

const AttendanceSchema = new Schema<IAttendance>({
  fingerprintId: { type: String, required: true },
  temperature: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
})

const Attendance: Model<IAttendance> =
  mongoose.models.Attendance ||
  mongoose.model<IAttendance>('Attendance', AttendanceSchema)

export default Attendance
