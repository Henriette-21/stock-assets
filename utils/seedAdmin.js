import user from '../models/user.js';
import bcrypt from 'bcryptjs';

export const seedSuperAdmin = async () => {
  try {
    // Check if a super admin already exists in the database
    const existingSuperAdmin = await user.findOne({ role: 'super_admin' });

    if (existingSuperAdmin) {
      console.log('Super admin already exists. Skipping seeding.');
      return;
    }

    // Define default super admin credentials (ideally loaded from .env)
    const adminName = process.env.SUPER_ADMIN_NAME || 'Anna';
    const adminEmail = process.env.SUPER_ADMIN_EMAIL || 'superadminhouseassets@gmail.com';
    const adminPassword = process.env.SUPER_ADMIN_PASSWORD || 'SuperAdmin@123';

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create the super admin user
    const superAdmin = new user({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'super_admin'
    });

    await superAdmin.save();
    console.log(`Default Super Admin created successfully. Email: ${adminEmail}`);
  } catch (error) {
    console.error('Error seeding super admin:', error.message);
  }
};