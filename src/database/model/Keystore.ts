import { Schema, model, Document } from 'mongoose';
import { IUser } from './User';
import Logger from '../../utils/Logger';

export const DOCUMENT_NAME = 'Keystore';
export const COLLECTION_NAME = 'keystores';

export interface IKeystore extends Document {
	client: IUser;
	primaryKey: string;
	secondaryKey: string;
	status?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

const keystoreSchema = new Schema(
	{
		client: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
			index: true
		},
		primaryKey: {
			type: Schema.Types.String,
			required: true,
			index: true
		},
		secondaryKey: {
			type: Schema.Types.String,
			required: true,
			index: true
		},
		status: {
			type: Schema.Types.Boolean,
			default: true
		},
		createdAt: {
			type: Date
		},
		updatedAt: {
			type: Date
		}
	},
	{
		versionKey: false
	});

const Keystore = model<IKeystore>(DOCUMENT_NAME, keystoreSchema, COLLECTION_NAME);
Keystore.createIndexes(err => Logger.error(err));

export default Keystore;