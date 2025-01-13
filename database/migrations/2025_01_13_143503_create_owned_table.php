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
      $table->string('name');
      $table->string('number');
      $table->string('cardId');
      $table->string('image');
      $table->string('setId');
      $table->string('setName');
      $table->string('setImage');
      $table->string('setSeries');
      $table->string('rarity');
      $table->json('rawJson');
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
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
