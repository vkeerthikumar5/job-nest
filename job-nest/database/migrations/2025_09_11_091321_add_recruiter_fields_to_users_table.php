<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Recruiter specific fields (nullable by default)
            $table->string('company_name')->nullable();
            $table->string('company_address')->nullable();
            $table->year('established_year')->nullable();
            $table->string('company_website')->nullable();
            $table->string('contact_number')->nullable();

           
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'company_name',
                'company_address',
                'established_year',
                'company_website',
                'contact_number',
            ]);

           
        });
    }
};
