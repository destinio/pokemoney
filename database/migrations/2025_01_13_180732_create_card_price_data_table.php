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
    Schema::create('card_price_data', function (Blueprint $table) {
      $table->id();
      $table->string('apiCardId');
      $table->decimal('low', 8, 2)->nullable();
      $table->decimal('mid', 8, 2)->nullable();
      $table->decimal('high', 8, 2)->nullable();
      $table->decimal('market', 8, 2)->nullable();
      $table->decimal('directLow', 8, 2)->nullable();
      $table->foreignId('seen_id')->constrained();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('card_price_data');
  }
};
