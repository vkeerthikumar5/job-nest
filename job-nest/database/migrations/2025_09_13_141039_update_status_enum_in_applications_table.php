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
    Schema::table('applications', function (Blueprint $table) {
        $table->enum('status', ['Applied', 'Shortlisted', 'Rejected'])
              ->default('Applied')
              ->change();
    });
}

public function down(): void
{
    Schema::table('applications', function (Blueprint $table) {
        $table->enum('status', ['applied', 'shortlisted', 'rejected'])
              ->default('applied')
              ->change();
    });
}

};
