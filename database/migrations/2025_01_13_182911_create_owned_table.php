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
      $table->timestamps();
      $table->decimal('pricePaid', 8, 2); // Changed from 'number' to 'decimal' for price
      $table->foreignId('seen_id')->constrained('seen'); // No cascade on delete for 'seens'
      $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); // Connects to 'users' table

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
