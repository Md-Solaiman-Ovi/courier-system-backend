import mongoose, { Document, Schema } from 'mongoose';

export type ParcelStatus = 'Booked' | 'Picked Up' | 'In Transit' | 'Delivered' | 'Failed';

export interface IParcel extends Document {
  customerId: mongoose.Types.ObjectId;
  agentId?: mongoose.Types.ObjectId;
  pickupAddress: string;
  deliveryAddress: string;
  parcelType: string;
  isCOD: boolean;
  amount: number;
  status: ParcelStatus;
  currentLocation?: { lat: number; lng: number };
}

const ParcelSchema = new Schema<IParcel>({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pickupAddress: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  parcelType: { type: String, required: true },
  isCOD: { type: Boolean, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Booked', 'Picked Up', 'In Transit', 'Delivered', 'Failed'], default: 'Booked' },
  currentLocation: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, { timestamps: true });

export default mongoose.model<IParcel>('Parcel', ParcelSchema);