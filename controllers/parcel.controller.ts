import { Request, Response } from 'express';
import Parcel from '../models/Parcel';

export const createParcel = async (req: Request, res: Response) => {
  try {
    console.log("parcel created", req.body)
    const parcel = new Parcel({ ...req.body, customerId: (req as any).user.id });
console.log(" new parcel", parcel)
    await parcel.save();
    console.log("parcel saved succesfully", parcel)
    res.status(201).json(parcel);

    console.log('New percel created successfully', parcel)
  } catch (err) {
    res.status(500).json({ message: 'Error creating parcel' });
  }
};

export const getParcelsByUser = async (req: Request, res: Response) => {
  try {
    const parcels = await Parcel.find({ customerId: (req as any).user.id });
    res.json(parcels);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching parcels' });
  }
};

export const getAllParcels = async (_req: Request, res: Response) => {
  try {
    const parcels = await Parcel.find();
    res.json(parcels);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching parcels' });
  }
};

export const updateParcel = async (req: Request, res: Response) => {
  try {
    const parcel = await Parcel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(parcel);
  } catch (err) {
    res.status(500).json({ message: 'Error updating parcel' });
  }
};

export const deleteParcel = async (req: Request, res: Response) => {
  try {
    await Parcel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Parcel deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting parcel' });
  }
};

export const assignAgentToParcel = async (req: Request, res: Response) => {
  try {
    const { agentId } = req.body;
    const parcel = await Parcel.findByIdAndUpdate(req.params.id, { agentId }, { new: true });

    const io = req.app.get('io');
    io.emit('parcel-assigned', parcel);

    res.json(parcel);
  } catch (err) {
    res.status(500).json({ message: 'Error assigning agent' });
  }
};

export const updateParcelStatus = async (req: Request, res: Response) => {
  try {
    const { status, currentLocation } = req.body;
    const parcel = await Parcel.findByIdAndUpdate(req.params.id, { status, currentLocation }, { new: true });

    const io = req.app.get('io');
    io.emit('parcel-status-updated', parcel);

    res.json(parcel);
  } catch (err) {
    res.status(500).json({ message: 'Error updating status' });
  }
};


