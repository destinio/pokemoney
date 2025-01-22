<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Series extends Model
{
  /** @use HasFactory<\Database\Factories\SeriesFactory> */
  use HasFactory;

  protected $fillable = ['name', 'release_date', 'image_url'];

  /**
   * Get the sets for the series.
   */
  public function sets()
  {
    return $this->hasMany(Set::class);
  }
}
