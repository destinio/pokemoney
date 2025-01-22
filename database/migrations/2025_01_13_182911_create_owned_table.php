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
    Schema::create('owned', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->timestamps();
      $table->decimal('price_paid', 8, 2); // Decimal for price
      $table->string('seen_id'); // Change to string to match 'seen.id'
      $table->foreign('seen_id')->references('id')->on('seen'); // Foreign key constraint
      $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); // Connect to 'users' table
    });
  }


  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('owned');
  }
};
