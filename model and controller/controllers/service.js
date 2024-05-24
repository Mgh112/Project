import Service from "../models/Service.js";

export const createService = async (req, res, next) => {
 
  const newService = new Service(req.body);

  try {
    const savedService = await newService.save();
    res.status(200).json(savedService);
  } catch (err) {
    next(err);
  }
};


export const getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    res.status(200).json(service);
  } catch (err) {
    next(err);
  }
};


export const getServices = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const services = await Service.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(services);
  } catch (err) {
    next(err);
  }
};

