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

    Schema::create('sets', function (Blueprint $table) {
      $table->string('id')->primary();
      $table->string('name');
      $table->unsignedBigInteger('series_id');
      $table->integer('printed_total');
      $table->integer('total');
      $table->date('release_date');
      $table->text('symbol_url');
      $table->text('logo_url');
      $table->timestamps();

      // Foreign key constraint
      $table->foreign('series_id')->references('id')->on('series')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('sets');
  }
};
