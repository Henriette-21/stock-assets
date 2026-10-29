import mongoose from 'mongoose';

const houseAssetSchema = new mongoose.Schema({
  propertyAddress: { type: String, required: true, trim: true },
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  serialNumber: { type: String, unique: true, sparse: true },
  purchaseDate: { type: Date },
  warrantyExpiry: { type: Date },
  status: { 
    type: String, 
    enum: ['Operational', 'Needs Maintenance', 'Under Repair', 'Replaced'], 
    default: 'Operational' 
  },
  estimatedValue: { type: Number, min: 0 }
}, { timestamps: true });

const HouseAsset = mongoose.model('houseAsset', houseAssetSchema);
export default HouseAsset;