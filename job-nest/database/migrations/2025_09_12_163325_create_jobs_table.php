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
    Schema::create('new-jobs', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('company_id'); // recruiter/ company who posted
        $table->string('title');
        $table->string('skills');
        $table->string('package');
        $table->enum('mode', ['On-site', 'Remote', 'Hybrid']);
        $table->string('location');
        $table->string('timings');
        $table->enum('status', ['active', 'archived'])->default('active');
        $table->timestamps();

        $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('new-jobs');
    }
};
