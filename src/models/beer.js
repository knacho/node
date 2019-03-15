import mongoose from 'mongoose';

const beerSchema = new mongoose.Schema({
  id: String,
  name: String,
  nameDisplay: String,
  abv: String,
  isOrganic: String,
  isRetired: String,
  status: String,
  statusDisplay: String,
});

export default mongoose.model('Beer', beerSchema);
