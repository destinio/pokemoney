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
      $table->string('cardId');
      $table->string('image');
      $table->string('setId');
      $table->string('setName');
      $table->string('setImage');
      $table->string('setSeries');
      $table->string('rarity');
      $table->json('rawJson');

      $table->timestamps();
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
