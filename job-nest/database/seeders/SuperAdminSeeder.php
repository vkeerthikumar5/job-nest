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
            ['email' => 'superadmin@jobnest.com'], 
            [
                'name' => 'Super Admin',
                'password' => Hash::make('SuperAdmin@123'), 
                'role' => 'super-admin', 
                
            ]
        );
    }
}
