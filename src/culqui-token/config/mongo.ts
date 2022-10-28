import { connect } from 'mongoose';

/**
 * @deprecated
 */
async function dbConnect(): Promise<void> {
  connect(String(process.env.MONGODB_URL));
}

export default dbConnect;
