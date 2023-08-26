import { faker } from '@faker-js/faker';

export const product = (options = {}) => {
  return {
    productName: options.productName || faker.lorem.word(),
    specificGravity: options.specificGravity || faker.number.float(),
  };
};

export const region = (regionName) => {
  return { regionName: regionName || faker.location.county() };
};

export const farm = (options = {}) => {
  const farm = {
    farmName: options.farmName || faker.lorem.word(),
    postcode: options.postcode || 'AB1 2CD',
    contactName: options.contactName || faker.person.fullName(),
    contactNumber: options.contactNumber || faker.phone.number('07### ######'),
    isActive: true,
    regionFK: options.region || null,
    accessCodes: options.accessCodes || null,
    region: options.region ? region() : null,
    products: [product(), product(), product()],
    comments: options.comments || null,
  };
  return farm;
};

export const data = (options = {}) => {
  const floatBeforeDelivery = faker.number.float();
  const floatAfterDelivery = floatBeforeDelivery + 100;
  const data = {
    farmFk: options.farmFk,
    date: options.date || faker.date.recent(),
    noOfCows: options.noOfCows || faker.number.int(),
    product: options.product || faker.lorem.word(),
    quantity: options.quantity || faker.number.float(),
    meterReading: options.meterReading || faker.number.float(),
    waterUsage: options.waterUsage || faker.number.float(),
    pumpDial: options.pumpDial || faker.number.float(),
    floatBeforeDelivery: options.floatBeforeDelivery || floatBeforeDelivery,
    targetFeedRate: options.targetFeedRate || faker.number.float(),
    floatAfterDelivery: options.floatAfterDelivery || floatAfterDelivery,
    comments: options.comments || faker.lorem.sentence(),
  };

  return data;
};

export const fullData = (options = {}) => {
  const data = {
    farmFk: options.farmFk,
    date: options.date || faker.date.recent(),
    noOfCows: options.noOfCows || faker.number.int(),
    product: options.product || faker.lorem.word(),
    quantity: options.quantity || faker.number.float(),
    meterReading: options.meterReading || faker.number.float(),
    waterUsage: options.waterUsage || faker.number.float(),
    pumpDial: options.pumpDial || faker.number.float(),
    kgActual: options.kgActual,
    floatBeforeDelivery: options.floatBeforeDelivery,
    targetFeedRate: options.targetFeedRate || faker.number.float(),
    averageWaterIntake: options.averageWaterIntake,
    actualFeedRate: options.actualFeedRate,
    floatAfterDelivery: options.floatAfterDelivery,
    deliveryDate: options.deliveryDate,
    comments: options.comments || faker.lorem.sentence(),
  };

  return data;
};
