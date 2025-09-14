<?php

namespace Database\Seeders;


use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'superadmin@jobnest.com'], // unique identifier
            [
                'name' => 'Super Admin',
                'password' => Hash::make('SuperAdmin@123'), // strong password
                'role' => 'super-admin', // or 1 if you’re using numeric roles
                
            ]
        );
    }
}
