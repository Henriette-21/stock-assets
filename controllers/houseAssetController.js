import HouseAsset from '../models/houseAsset.js';

export const addAsset = async (req, res) => {
  try {
    const { propertyAddress, itemName, category, serialNumber, purchaseDate, warrantyExpiry, estimatedValue } = req.body;
    
    const newAsset = new HouseAsset({
      propertyAddress,
      itemName,
      category,
      serialNumber,
      purchaseDate,
      warrantyExpiry,
      estimatedValue
    });

    await newAsset.save();
    res.status(201).json({ message: 'House asset added successfully', asset: newAsset });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAssets = async (req, res) => {
  try {
    const { property } = req.query;
    const filter = property ? { propertyAddress: new RegExp(property, 'i') } : {};
    
    const assets = await HouseAsset.find(filter);
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAssetStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const asset = await HouseAsset.findById(id);
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }

    asset.status = status;
    await asset.save();

    res.status(200).json({ message: 'Asset status updated successfully', asset });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAsset = await HouseAsset.findByIdAndDelete(id);
    
    if (!deletedAsset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    res.status(200).json({ message: 'Asset deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};