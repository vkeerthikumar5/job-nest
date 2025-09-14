<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Personal details
            $table->date('dob')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->string('address', 500)->nullable();

            // Educational details
            $table->string('degree')->nullable();
            $table->string('specialization')->nullable();
            $table->string('college_name')->nullable();
            $table->integer('graduation_year')->nullable();
            $table->decimal('cgpa', 4, 2)->nullable();

            // Professional / Skills
            $table->text('skills')->nullable();
            $table->text('projects')->nullable();
            $table->text('internships')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'dob', 'gender', 'address',
                'degree', 'specialization', 'college_name', 'graduation_year', 'cgpa',
                'skills', 'projects', 'internships'
            ]);
        });
    }
};
