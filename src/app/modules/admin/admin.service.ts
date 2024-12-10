import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { User } from '../user/user.model';

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const updateSingleAdminIntoDB = async (
  id: string,
  payload: Partial<TAdmin>,
) => {
  // dynamically update primitive and non-primitive data
  const { name, ...restAdminData } = payload;
  const modifyUpdatedData: Record<string, unknown> = { ...restAdminData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifyUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await Admin.findByIdAndUpdate(id, modifyUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // update Admin with delete property true
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Admin could not found');
    }

    // get user _id from deletedAdmin
    const userId = deletedAdmin.user;

    // update Admin User with delete property true
    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'User could not found');
    }

    await session.commitTransaction();
    await session.endSession();

    return { deletedAdmin, deletedUser };
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateSingleAdminIntoDB,
  deleteSingleAdminFromDB,
};
