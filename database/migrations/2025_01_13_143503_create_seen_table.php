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

    Schema::create('seen', function (Blueprint $table) {
      $table->string('id')->primary();
      $table->string('name');
      $table->string('number');
      $table->string('type');
      $table->string('image_url');
      $table->string('card_id');
      $table->string('set_id');
      $table->string('rarity');
      $table->timestamps();

      // Foreign key constraint
      $table->foreign('set_id')->references('id')->on('sets')->onDelete('cascade');

      /* $table->index('set_id');  // Index for foreign key column */
      /* $table->index('card_id'); // Index for card_id for searching */
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('seen');
  }
};
