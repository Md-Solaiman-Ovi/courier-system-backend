import { Request, Response } from 'express';
import Parcel from '../models/Parcel';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';

export const getAnalytics = async (_req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyBookings = await Parcel.countDocuments({ createdAt: { $gte: today } });
    const codAmount = await Parcel.aggregate([
      { $match: { isCOD: true } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const failedDeliveries = await Parcel.countDocuments({ status: 'Failed' });

    res.json({
      dailyBookings,
      codAmount: codAmount[0]?.total || 0,
      failedDeliveries
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching analytics' });
  }
};

export const exportCSV = async (_req: Request, res: Response) => {
  try {
    const parcels = await Parcel.find().lean();
    const parser = new Parser();
    const csv = parser.parse(parcels);
    res.header('Content-Type', 'text/csv');
    res.attachment('parcels.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Error exporting CSV' });
  }
};

export const exportPDF = async (_req: Request, res: Response) => {
  try {
    const parcels = await Parcel.find().lean();
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=parcels.pdf');
    doc.pipe(res);

    parcels.forEach(p => {
      doc.text(`Parcel: ${p._id}`);
      doc.text(`Customer: ${p.customerId}`);
      doc.text(`Pickup: ${p.pickupAddress}`);
      doc.text(`Delivery: ${p.deliveryAddress}`);
      doc.text(`Status: ${p.status}`);
      doc.text('------------------------');
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ message: 'Error exporting PDF' });
  }
};
