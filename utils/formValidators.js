import dayjs from 'dayjs';
import * as Yup from 'yup';

export const loginValidator = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  password: Yup.string().required('Password is required'),
});

export const dataValidator = Yup.object().shape({
  date: Yup.date().max(
    new Date(dayjs().endOf('day')),
    'The date cannot be in the future'
  ),
  product: Yup.string().required('A product is required'),
  noOfCows: Yup.number()
    .required('Number of cows is required')
    .min(1, 'Number of cows must be greater than 0'),
  quantity: Yup.number()
    .required('Quantity is required')
    .min(0, 'Quantity cannot be a negative number'),
  meterReading: Yup.number()
    .required('The meter reading is required')
    .min(0, 'The meter reading cannot be a negative number'),
  waterUsage: Yup.number()
    .required('The water usage is required')
    .min(0, 'The water usage cannot be a negative number'),
  pumpDial: Yup.number()
    .required('The pump dial is required')
    .min(0, 'The pump dial cannot be a negative number'),
  floatBeforeDelivery: Yup.number()
    .required('The float before delivery is required')
    .min(0, 'The float before delivery cannot be a negative number'),
  targetFeedRate: Yup.number()
    .required('The target feed rate is required')
    .min(0, 'The target feed rate cannot be a negative number'),
  floatAfterDelivery: Yup.number()
    .required('The float after delivery is required')
    .min(
      Yup.ref('floatBeforeDelivery'),
      'The float after delivery cannot be less than the float before delivery'
    ),
});
